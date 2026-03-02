import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import SanityProjects from "@/modules/projects/components/SanityProjects";
import { METADATA } from "@/common/constants/metadata";

export const revalidate = 60;

interface ProjectsPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: ProjectsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "portfolio frontend developer, software engineer jambi",
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}/projects`,
    },
  };
}

const ProjectsPage = async ({ params: { locale } }: ProjectsPageProps) => {
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <SanityProjects locale={locale} />
    </Container>
  );
};

export default ProjectsPage;
