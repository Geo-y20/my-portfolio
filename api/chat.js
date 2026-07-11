const { SYSTEM_PROMPT } = require('./portfolio-context');

// Tried in order; free-tier models occasionally hit shared upstream rate
// limits for a few seconds, so we fall through a short chain of models from
// different families rather than a single fallback.
const MODEL_CHAIN = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-20b:free',
];

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_TOKENS = 400;

// Best-effort per-instance rate limit (in-memory, not shared across Vercel
// instances/cold starts). Adequate for a low-traffic portfolio site without
// paid external infra; not a substitute for a real distributed limiter.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return 'messages must be a non-empty array';
  if (messages.length > MAX_MESSAGES) return `too many messages (max ${MAX_MESSAGES})`;
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return 'invalid message role';
    if (typeof m.content !== 'string' || !m.content.trim()) return 'invalid message content';
    if (m.content.length > MAX_MESSAGE_LENGTH) return `message too long (max ${MAX_MESSAGE_LENGTH} chars)`;
  }
  return null;
}

async function callOpenRouter(apiKey, model, messages) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: MAX_TOKENS,
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`OpenRouter ${model} responded ${res.status}: ${errText}`);
  }
  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) throw new Error(`OpenRouter ${model} returned no content`);
  return reply;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Chat is not configured.' });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "You've sent a lot of messages — please try again later." });
    return;
  }

  const { messages } = req.body || {};
  const validationError = validateMessages(messages);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const payload = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

  let reply;
  for (const model of MODEL_CHAIN) {
    try {
      reply = await callOpenRouter(apiKey, model, payload);
      break;
    } catch (err) {
      // try the next model in the chain
    }
  }

  if (reply) {
    res.status(200).json({ reply });
  } else {
    res.status(502).json({ error: 'The chat assistant is temporarily unavailable. Please try again shortly.' });
  }
};
