"use client";

import { SiHackaday as PicoIcon } from "react-icons/si";
import { BsFlag as FlagIcon } from "react-icons/bs";
import { FiExternalLink as ExternalLinkIcon } from "react-icons/fi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { picoctf } from "@/contents/picoctf";

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
    <span className="text-xl font-bold text-yellow-500">{value}</span>
    <span className="text-center text-xs text-neutral-500">{label}</span>
  </div>
);

const PicoCTF = () => {
  return (
    <section className="space-y-3">
      <SectionHeading title="PicoCTF" icon={<FlagIcon />} />
      <SectionSubHeading>
        <p className="text-sm">
          Carnegie Mellon University&apos;s cybersecurity competition platform.
        </p>
        <a
          href={picoctf.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          @{picoctf.username}
          <ExternalLinkIcon size={12} />
        </a>
      </SectionSubHeading>

      <SpotlightCard className="p-5 space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatItem label="Total Points" value={picoctf.total_points.toLocaleString()} />
          <StatItem label="Challenges Solved" value={picoctf.challenges_solved} />
          <StatItem label="Global Rank" value={picoctf.global_rank} />
          <StatItem label="Competitions" value={picoctf.competitions} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {picoctf.categories.map((cat) => (
              <span
                key={cat.name}
                className={`rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium dark:border-neutral-700 dark:bg-neutral-800 ${cat.color}`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};

export default PicoCTF;
