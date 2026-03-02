import Image from "next/image";
import { urlFor } from "./sanity";

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Image"}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="my-4 overflow-x-auto rounded-lg bg-neutral-900 p-4">
          <code className="text-sm text-neutral-100">{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = value.blank ? "_blank" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-3 mt-6 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-3 text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-4 border-l-4 border-neutral-300 pl-4 italic text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
};
