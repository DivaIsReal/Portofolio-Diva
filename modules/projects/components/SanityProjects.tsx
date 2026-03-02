import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import SanityProjectCard, { SanityProject } from "./SanityProjectCard";
import EmptyState from "@/common/components/elements/EmptyState";

const SanityProjects = async ({ locale = "en" }: { locale?: string }) => {
  let projects: SanityProject[] = [];

  try {
    projects = await client.fetch(projectsQuery);
  } catch {
    projects = [];
  }

  if (projects.length === 0) {
    return <EmptyState message="No projects found." />;
  }

  const sorted = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sorted.map((project) => (
        <SanityProjectCard key={project._id} {...project} locale={locale} />
      ))}
    </section>
  );
};

export default SanityProjects;
