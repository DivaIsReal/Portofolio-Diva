"use client";

import { SiTryhackme as THMIcon } from "react-icons/si";
import {
  BsFire as StreakIcon,
  BsTrophy as TrophyIcon,
  BsShieldCheck as ShieldIcon,
} from "react-icons/bs";
import { FiExternalLink as ExternalLinkIcon } from "react-icons/fi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { tryhackme } from "@/contents/tryhackme";

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
    <div className="text-blue-400">{icon}</div>
    <div>
      <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
        {value}
      </p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  </div>
);

const TryHackMe = () => {
  return (
    <section className="space-y-3">
      <SectionHeading title="TryHackMe" icon={<THMIcon />} />
      <SectionSubHeading>
        <p className="text-sm">
          Hands-on cybersecurity training platform with guided rooms.
        </p>
        <a
          href={tryhackme.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          @{tryhackme.username}
          <ExternalLinkIcon size={12} />
        </a>
      </SectionSubHeading>

      <SpotlightCard className="p-5 space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-400">{tryhackme.rank}</p>
            <p className="text-xs text-neutral-500">Current Rank</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
            <StreakIcon className="text-orange-400" size={16} />
            <span className="text-sm font-semibold text-orange-400">
              {tryhackme.day_streak} day streak
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatItem
            icon={<TrophyIcon size={20} />}
            label="Total Points"
            value={tryhackme.total_points.toLocaleString()}
          />
          <StatItem
            icon={<ShieldIcon size={20} />}
            label="Rooms Completed"
            value={tryhackme.rooms_completed}
          />
          <StatItem
            icon={<TrophyIcon size={20} />}
            label="Badges Earned"
            value={tryhackme.badges}
          />
          <StatItem
            icon={<ShieldIcon size={20} />}
            label="Global Rank"
            value={tryhackme.global_rank_percent}
          />
        </div>
      </SpotlightCard>
    </section>
  );
};

export default TryHackMe;
