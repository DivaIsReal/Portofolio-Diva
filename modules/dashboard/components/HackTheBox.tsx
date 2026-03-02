"use client";

import { SiHackthebox as HTBIcon } from "react-icons/si";
import { BsBoxFill as BoxIcon } from "react-icons/bs";
import { FiExternalLink as ExternalLinkIcon } from "react-icons/fi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { hackthebox } from "@/contents/hackthebox";

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
    <span className="text-xl font-bold" style={{ color: "#9fef00" }}>
      {value}
    </span>
    <span className="text-center text-xs text-neutral-500">{label}</span>
  </div>
);

const HackTheBox = () => {
  return (
    <section className="space-y-3">
      <SectionHeading title="Hack The Box" icon={<BoxIcon />} />
      <SectionSubHeading>
        <p className="text-sm">
          Elite cybersecurity training platform with real-world machines.
        </p>
        <a
          href={hackthebox.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          @{hackthebox.username}
          <ExternalLinkIcon size={12} />
        </a>
      </SectionSubHeading>

      <SpotlightCard className="p-5 space-y-5">
        <div className="flex flex-col gap-1">
          <p
            className="text-2xl font-bold"
            style={{ color: "#9fef00" }}
          >
            {hackthebox.rank}
          </p>
          <p className="text-xs text-neutral-500">Current Rank</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatItem label="Machines Owned" value={hackthebox.machines_owned} />
          <StatItem
            label="Challenges Solved"
            value={hackthebox.challenges_solved}
          />
          <StatItem
            label="Global Rank"
            value={hackthebox.global_rank_percent}
          />
          <StatItem
            label="Total Points"
            value={hackthebox.total_points.toLocaleString()}
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Specializations
          </p>
          <div className="flex flex-wrap gap-2">
            {hackthebox.specializations.map((spec) => (
              <span
                key={spec.name}
                className={`rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium dark:border-neutral-700 dark:bg-neutral-800 ${spec.color}`}
              >
                {spec.name}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};

export default HackTheBox;
