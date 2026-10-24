import { SYSTEM_PROMPT } from '@/lib/portfolio-context';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Tried in order; free-tier models occasionally hit shared upstream rate
// limits for a few seconds, so we fall through a short chain of models from
// different families rather than a single fallback. OpenRouter retires `:free`
// model IDs without notice (the previous Llama/Qwen/gpt-oss IDs all 404'd), so
// the chain ends with `openrouter/free`, which routes to any live free model.
// Override without a redeploy via OPENROUTER_MODELS="model-a,model-b".
const MODEL_CHAIN = (process.env.OPENROUTER_MODELS || [
  'nvidia/nemotron-3.5-lightning:free',
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'openrouter/free',
].join(',')).split(',').map((m) => m.trim()).filter(Boolean);

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;
// Generous so reasoning models that ignore `reasoning.exclude` still have
// budget left for the visible answer (otherwise content comes back null).
const MAX_TOKENS = 700;

// Best-effort per-instance rate limit (in-memory, not shared across Vercel
// instances/cold starts). Adequate for a low-traffic portfolio site without
// paid external infra; not a substitute for a real distributed limiter.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map();

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
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
      reasoning: { effort: 'low', exclude: true },
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

const json = (body, status) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY is not set for this Vercel environment');
    return json({ error: 'Chat is not configured.' }, 500);
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json({ error: "You've sent a lot of messages — please try again later." }, 429);
  }

  const body = await request.json().catch(() => ({}));
  const { messages } = body || {};
  const validationError = validateMessages(messages);
  if (validationError) {
    return json({ error: validationError }, 400);
  }

  const payload = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

  let reply;
  for (const model of MODEL_CHAIN) {
    try {
      reply = await callOpenRouter(apiKey, model, payload);
      break;
    } catch (err) {
      // Logged so failures show up in Vercel function logs; try the next model.
      console.error(err.message);
    }
  }

  if (reply) return json({ reply }, 200);
  return json({ error: 'The chat assistant is temporarily unavailable. Please try again shortly.' }, 502);
}

function methodNotAllowed() {
  return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
export { methodNotAllowed as GET, methodNotAllowed as PUT, methodNotAllowed as PATCH, methodNotAllowed as DELETE };
