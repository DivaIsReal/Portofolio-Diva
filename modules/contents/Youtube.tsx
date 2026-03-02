import Link from "next/link";
import { FiPlay as PlayIcon } from "react-icons/fi";
import { BsYoutube as YoutubeIcon } from "react-icons/bs";

import SectionHeading from "@/common/components/elements/SectionHeading";
import { client } from "@/lib/sanity";
import { youtubeQuery } from "@/lib/queries";
import { getYoutubeThumbnail } from "@/lib/getYoutubeThumbnail";

interface YoutubeItem {
  _id: string;
  title: string;
  youtubeUrl: string;
  description?: string | null;
  category: string;
  publishedAt: string;
}

const YoutubeCard = ({ item }: { item: YoutubeItem }) => {
  const thumbnail = getYoutubeThumbnail(item.youtubeUrl);

  return (
    <Link
      href={item.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={item.title}
            className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${thumbnail.split("/vi/")[1]?.split("/")[0]}/hqdefault.jpg`;
            }}
          />
        ) : (
          <div className="flex h-[180px] w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <YoutubeIcon size={40} className="text-red-500" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-red-600 p-3">
            <PlayIcon size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          {item.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-medium text-neutral-800 transition-colors group-hover:text-yellow-500 dark:text-neutral-200">
          {item.title}
        </h3>
        {item.description && (
          <p className="line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">
            {item.description}
          </p>
        )}
        <p className="text-[10px] text-neutral-400">
          {new Date(item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};

const Youtube = async () => {
  let videos: YoutubeItem[] = [];

  try {
    videos = await client.fetch(youtubeQuery);
  } catch {
    videos = [];
  }

  if (videos.length === 0) return null;

  return (
    <section className="space-y-4">
      <SectionHeading title="YouTube Content" icon={<YoutubeIcon className="text-red-500" />} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((item) => (
          <YoutubeCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Youtube;
