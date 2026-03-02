export type CertificationStatus = "done" | "progress" | "planned";

export type Certification = {
  name: string;
  issuer: string;
  field: string;
  status: CertificationStatus;
  progress: number;
  year: string | null;
};

export const certifications: Certification[] = [
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    field: "Networking",
    status: "done",
    progress: 100,
    year: "2024",
  },
  {
    name: "Cisco CCNA",
    issuer: "Cisco",
    field: "Networking",
    status: "progress",
    progress: 65,
    year: null,
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    field: "Cybersecurity",
    status: "planned",
    progress: 20,
    year: null,
  },
  {
    name: "Cisco CyberOps Associate",
    issuer: "Cisco",
    field: "Security Operations",
    status: "progress",
    progress: 45,
    year: null,
  },
];
