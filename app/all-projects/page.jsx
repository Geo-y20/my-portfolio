import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import FilterableProjects, { FilterBar, FilterEmpty, FilterGrid, FilterGroup } from '@/components/FilterableProjects';
import { pageMetadata } from '@/lib/metadata';
import { archiveGroups, filters, learningCount, projectCount } from '@/content/projects';

export const metadata = pageMetadata({
  title: 'All Projects',
  description: `${projectCount} AI projects by George Youhana: agents and RAG, Text-to-SQL, forecasting, OCR, on-prem vision, speech and Arabic NLP, from production systems to research.`,
  ogDescription: `${projectCount} AI projects: agents and RAG, Text-to-SQL, forecasting, OCR, on-prem vision, speech and Arabic NLP.`,
  path: '/all-projects',
});

export default function AllProjectsPage() {
  const allTags = archiveGroups.flatMap((g) => g.projects.map((p) => p.tags));

  return (
    <>
      <div className="container">
        <header className="page-hero">
          <Link className="back-link" href="/#work"><span aria-hidden="true">←</span> Home</Link>
          <p className="eyebrow"><b>Archive</b> / {`${projectCount} projects + ${learningCount} early learning`}</p>
          <h1>All projects</h1>
          <p>Production systems first, then research. Early learning projects are collapsed at the bottom. Filter by the track you care about.</p>
        </header>
      </div>

      <FilterableProjects id="archive-scope" filters={filters} items={allTags}>
        <FilterBar />
        {/* MEDIA: any screenshot added here must use mock or blurred company data. */}
        {archiveGroups.map((group) => (
          <FilterGroup key={group.id} id={group.id} title={group.title} collapsed={group.collapsed} tags={group.projects.map((p) => p.tags)}>
            <FilterGrid className="grid-cards">
              {group.projects.map((p) => <ProjectCard key={p.title} project={p} />)}
            </FilterGrid>
          </FilterGroup>
        ))}
        <FilterEmpty />
        <div className="archive-end" aria-hidden="true" />
      </FilterableProjects>
    </>
  );
}
