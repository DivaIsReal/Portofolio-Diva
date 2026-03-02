export type CTFEvent = {
  name: string;
  organizer: string;
  categories: string[];
  score: number;
  rank: string;
  color: string;
};

export const ctfHistory: CTFEvent[] = [
  {
    name: "PicoCTF 2024",
    organizer: "Carnegie Mellon University",
    categories: ["Web", "Forensics", "Crypto"],
    score: 12450,
    rank: "Top 8%",
    color: "#eab308",
  },
  {
    name: "HackTheBox Cyber Apocalypse 2024",
    organizer: "HackTheBox",
    categories: ["Web", "Pwn", "Rev"],
    score: 8300,
    rank: "Top 12%",
    color: "#9fef00",
  },
  {
    name: "TryHackMe Advent of Cyber 2023",
    organizer: "TryHackMe",
    categories: ["Forensics", "Web", "Network"],
    score: 5800,
    rank: "Top 15%",
    color: "#60a5fa",
  },
];
