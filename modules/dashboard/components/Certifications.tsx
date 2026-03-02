import Link from "next/link";
import { BsCheckCircleFill, BsCircle, BsClockFill } from "react-icons/bs";
import { PiCertificate as CertIcon } from "react-icons/pi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { certificatesQuery } from "@/lib/queries";
import { client, urlFor } from "@/lib/sanity";

type CertificationStatus = "done" | "progress" | "planned";

interface SanityCertificate {
  _id: string;
  name: string;
  issuer: string;
  field: string;
  status: CertificationStatus;
  progress: number;
  year?: string | null;
  image?: any;
  credentialUrl?: string | null;
}

const statusConfig: Record<
  CertificationStatus,
  {
    label: string;
    icon: React.ReactNode;
    barColor: string;
    textColor: string;
    badgeClass: string;
  }
> = {
  done: {
    label: "Completed",
    icon: <BsCheckCircleFill size={14} className="text-green-500" />,
    barColor: "bg-green-500",
    textColor: "text-green-500",
    badgeClass: "border-green-500/30 bg-green-500/10 text-green-500",
  },
  progress: {
    label: "In Progress",
    icon: <BsClockFill size={14} className="text-yellow-500" />,
    barColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    badgeClass: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  },
  planned: {
    label: "Planned",
    icon: <BsCircle size={14} className="text-blue-400" />,
    barColor: "bg-blue-400",
    textColor: "text-blue-400",
    badgeClass: "border-blue-400/30 bg-blue-400/10 text-blue-400",
  },
};

const Certifications = async () => {
  let certifications: SanityCertificate[] = [];

  try {
    certifications = await client.fetch(certificatesQuery);
  } catch {
    certifications = [];
  }

  return (
    <section className="space-y-3">
      <SectionHeading title="Certifications" icon={<CertIcon />} />
      <SectionSubHeading>
        <p className="text-sm">
          Professional certifications progress in networking and cybersecurity.
        </p>
        <span className="text-sm text-neutral-500">
          {certifications.filter((c) => c.status === "done").length} /{" "}
          {certifications.length} completed
        </span>
      </SectionSubHeading>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {certifications.map((cert) => {
          const config = statusConfig[cert.status];
          const imageUrl = cert.image
            ? urlFor(cert.image).width(600).url()
            : null;

          return (
            <SpotlightCard key={cert._id} className="space-y-4 p-5">
              {imageUrl && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={cert.name}
                    className="h-32 w-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {cert.issuer} &middot; {cert.field}
                  </p>
                </div>
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${config.badgeClass}`}
                >
                  {config.icon}
                  {cert.status === "done" && cert.year
                    ? cert.year
                    : config.label}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Progress</span>
                  <span className={config.textColor}>{cert.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
              </div>

              {cert.credentialUrl && (
                <Link
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-yellow-500 underline underline-offset-2 hover:text-yellow-400"
                >
                  View Credential
                </Link>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
