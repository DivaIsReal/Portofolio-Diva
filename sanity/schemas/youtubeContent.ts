import { defineField, defineType } from "sanity";

export default defineType({
  name: "youtubeContent",
  title: "YouTube Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Video title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Full YouTube video URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short description (optional)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        'e.g. "Network Tutorial" / "CTF Writeup" / "Lab Demo"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      description: "Publish date",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
