import { useTranslations } from "next-intl";

const Story = () => {
  const t = useTranslations("AboutPage");

  const paragraphData = [{ index: 1 }, { index: 2 }, { index: 3 }];

  return (
    <section className="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
      {paragraphData.map((paragraph) => (
        <div key={paragraph.index}>
          {t(`resume.paragraph_${paragraph.index}`)}
        </div>
      ))}
    </section>
  );
};

export default Story;
