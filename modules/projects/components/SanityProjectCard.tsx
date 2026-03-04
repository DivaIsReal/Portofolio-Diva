import Link from "next/link";
import { HiOutlineExternalLink as ExternalLinkIcon } from "react-icons/hi";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";
import { IoDocumentTextOutline as DocIcon } from "react-icons/io5";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { urlFor } from "@/lib/sanity";

interface SanityProject {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  category: string;
  tools?: string[];
  thumbnail?: any;
  blogUrl?: string | null;
  content?: any[];
  date: string;
  featured: boolean;
  locale?: string;
}

const SanityProjectCard = ({
  title,
  slug,
  description,
  category,
  tools,
  thumbnail,
  blogUrl,
  featured,
  locale = "en",
}: SanityProject) => {
  const trimmedDesc =
    description.slice(0, 85) + (description.length > 85 ? "..." : "");

  const thumbnailUrl = thumbnail
    ? urlFor(thumbnail).width(450).url()
    : null;

  const documentationUrl = slug ? `/${locale}/projects/${slug.current}` : null;

  return (
    <SpotlightCard className="group relative flex flex-col overflow-hidden cursor-default">
      {featured && (
        <div className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-lg bg-primary px-2 py-1 text-sm font-medium text-neutral-900">
          <PinIcon size={15} />
          <span>Featured</span>
        </div>
      )}

      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="aspect-video w-full object-cover object-top"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <span className="text-sm text-neutral-400">No thumbnail</span>
        </div>
      )}

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="space-y-1">
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            {category}
          </span>
          <h3 className="text-neutral-700 dark:text-neutral-300">{title}</h3>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {trimmedDesc}
          </p>
        </div>

        {tools && tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool, i) => (
              <span
                key={i}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {documentationUrl && (
            <Link
              href={documentationUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
            >
              <DocIcon size={14} />
              Lihat Dokumentasi
            </Link>
          )}
          
          {blogUrl && (
            <Link
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600 transition-colors hover:bg-yellow-500/20 dark:text-yellow-400"
            >
              External Link
              <ExternalLinkIcon size={12} />
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default SanityProjectCard;
export type { SanityProject };
