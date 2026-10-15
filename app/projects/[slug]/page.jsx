import { notFound } from "next/navigation";
import { PageBlocks } from "@/components/Blocks";
import ProjectHeader from "@/components/ProjectHeader";
import WorkList from "@/components/WorkList";
import { getLocalProjects, getProject, getProjects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = p.description || p.roleSummary || undefined;
  return {
    title: `${p.title} · ${p.company}`,
    description,
    openGraph: { title: p.title, description, images: p.cover ? [p.cover.src] : undefined },
    alternates: { canonical: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <article className="project">
        <ProjectHeader project={project} />
        <PageBlocks blocks={project.blocks} />
      </article>
      <footer className="project-footer">
        <WorkList projects={getProjects()} current={slug} compact />
      </footer>
    </>
  );
}
