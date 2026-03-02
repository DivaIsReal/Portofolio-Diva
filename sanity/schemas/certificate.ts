import { defineField, defineType } from "sanity";

export default defineType({
  name: "certificates",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'e.g. "Cisco CCNA"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      description: 'e.g. "Cisco"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "field",
      title: "Field",
      type: "string",
      description: 'e.g. "Networking" / "Cybersecurity"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "done" },
          { title: "In Progress", value: "progress" },
          { title: "Planned", value: "planned" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "progress",
      title: "Progress (%)",
      type: "number",
      description: "Completion percentage (0–100)",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "year",
      title: "Year Completed",
      type: "string",
      description: "Year of completion (only if status is done)",
    }),
    defineField({
      name: "image",
      title: "Certificate Image",
      type: "image",
      description: "Photo or scan of the certificate",
      options: { hotspot: true },
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
      description: "Link to verify the certificate (optional)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "issuer",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle} · ${status}`,
      };
    },
  },
});
