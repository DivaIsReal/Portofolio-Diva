"use client";

import { BsFlag as FlagIcon, BsTrophy as TrophyIcon } from "react-icons/bs";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ctfHistory } from "@/contents/ctf";

const CTFHistory = () => {
  return (
    <section className="space-y-3">
      <SectionHeading title="CTF History" icon={<TrophyIcon />} />
      <SectionSubHeading>
        <p className="text-sm">
          Cybersecurity competitions I&apos;ve participated in.
        </p>
        <span className="text-sm text-neutral-500">
          {ctfHistory.length} events
        </span>
      </SectionSubHeading>

      <div className="space-y-3">
        {ctfHistory.map((event, index) => (
          <SpotlightCard key={index} className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FlagIcon size={14} style={{ color: event.color }} />
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {event.name}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500">{event.organizer}</p>
                <div className="flex flex-wrap gap-1.5">
                  {event.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row gap-4 sm:flex-col sm:items-end sm:gap-1">
                <div className="text-right">
                  <p
                    className="text-lg font-bold"
                    style={{ color: event.color }}
                  >
                    {event.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500">points</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {event.rank}
                  </p>
                  <p className="text-xs text-neutral-500">rank</p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default CTFHistory;
