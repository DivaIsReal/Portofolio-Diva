import { Metadata } from "next";
import { PortableText } from "@portabletext/react";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";
import { client, urlFor } from "@/lib/sanity";
import { projectBySlugQuery } from "@/lib/queries";
import { portableTextComponents } from "@/lib/portableTextComponents";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  tools?: string[];
  thumbnail?: any;
  blogUrl?: string | null;
  content?: any[];
  date: string;
  featured: boolean;
}

const getProjectDetail = async (slug: string): Promise<SanityProject | null> => {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectDetail(slug);

  if (!project) {
    return {
      title: `Project Not Found ${METADATA.exTitle}`,
    };
  }

  const thumbnailUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(1200).height(630).url()
    : null;

  return {
    title: `${project.title} ${METADATA.exTitle}`,
    description: project.description,
    openGraph: {
      images: thumbnailUrl ? [thumbnailUrl] : [],
      url: `${METADATA.openGraph.url}/projects/${slug}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "article",
      authors: [METADATA.creator],
    },
    keywords: project.title,
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}/projects/${slug}`,
    },
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;
  const project = await getProjectDetail(slug);

  if (!project) {
    return (
      <Container data-aos="fade-up">
        <BackButton url="/projects" />
        <PageHeading title="Project Not Found" description="The requested project could not be found." />
      </Container>
    );
  }

  const thumbnailUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(1200).height(600).url()
    : null;

  return (
    <Container data-aos="fade-up">
      <BackButton url="/projects" />
      <PageHeading title={project.title} description={project.description} />
      
      <div className="space-y-8">
        {/* Project Info */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            {project.category}
          </span>
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={thumbnailUrl}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* External Blog URL */}
        {project.blogUrl && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
            <p className="mb-2 text-sm font-medium text-yellow-800 dark:text-yellow-200">
              📝 External Documentation Available
            </p>
            <Link
              href={project.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-yellow-600 underline hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
            >
              {project.blogUrl}
            </Link>
          </div>
        )}

        {/* Documentation Content */}
        {project.content && project.content.length > 0 && (
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <PortableText 
              value={project.content}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProjectDetailPage;
