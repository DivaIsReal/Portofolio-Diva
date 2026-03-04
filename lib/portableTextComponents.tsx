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
        <pre
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "8px",
            padding: "12px 16px",
            overflowX: "auto",
            color: "#22c55e",
            fontFamily: "monospace",
            fontSize: "13px",
            lineHeight: "1.7",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          <code style={{ fontFamily: "monospace" }}>{value.code}</code>
        </pre>
      );
    },
    table: ({ value }: any) => {
      const rows: { _key: string; cells: string[] }[] = value?.rows ?? [];
      if (rows.length === 0) return null;
      const [headerRow, ...bodyRows] = rows;
      return (
        <div
          style={{
            overflowX: "auto",
            marginTop: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #1e1e1e",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {headerRow.cells.map((cell, i) => (
                  <th
                    key={i}
                    style={{
                      background: "#161616",
                      color: "#eab308",
                      padding: "10px 14px",
                      borderBottom: "1px solid #1e1e1e",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr
                  key={row._key}
                  style={{
                    background: rowIndex % 2 === 0 ? "#0f0f0f" : "#111",
                  }}
                >
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        color: "#999",
                        padding: "10px 14px",
                        borderBottom: "1px solid #1e1e1e",
                        fontSize: "13px",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    strong: ({ children }: any) => (
      <strong style={{ color: "#f0f0f0", fontWeight: 600 }}>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code
        style={{
          background: "#1a1a1a",
          color: "#eab308",
          padding: "2px 7px",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "13px",
          border: "1px solid #2a2a2a",
        }}
      >
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#f5f5f5",
          margin: "28px 0 12px",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 600,
          color: "#f0f0f0",
          marginTop: "20px",
          marginBottom: "8px",
          paddingBottom: "8px",
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 600,
          color: "#e0e0e0",
          marginTop: "14px",
          marginBottom: "6px",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-3 text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        style={{
          borderLeft: "3px solid #eab308",
          padding: "12px 20px",
          background: "rgba(234,179,8,0.03)",
          borderRadius: "0 6px 6px 0",
          color: "#666",
          fontStyle: "italic",
          margin: "12px 0",
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => {
      const isEmpty =
        children == null ||
        (Array.isArray(children) &&
          children.every(
            (c: any) => c === "" || c === null || c === undefined,
          ));
      if (isEmpty) return null;
      return (
        <p
          style={{
            fontSize: "15px",
            color: "#999",
            lineHeight: "1.85",
            marginTop: "0",
            marginBottom: "6px",
          }}
        >
          {children}
        </p>
      );
    },
    hr: () => (
      <hr
        style={{
          border: "none",
          borderTop: "1px dashed #1e1e1e",
          margin: "22px 0",
        }}
      />
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul
        style={{
          color: "#999",
          paddingLeft: "24px",
          marginTop: "0",
          marginBottom: "6px",
          lineHeight: "1.85",
          listStyleType: "disc",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol
        style={{
          color: "#999",
          paddingLeft: "24px",
          marginTop: "0",
          marginBottom: "6px",
          lineHeight: "1.85",
          listStyleType: "decimal",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li
        className="marker:text-[#eab308]"
        style={{ lineHeight: "1.85", marginBottom: "2px" }}
      >
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li
        className="marker:font-semibold marker:text-[#eab308]"
        style={{ lineHeight: "1.85", marginBottom: "2px" }}
      >
        {children}
      </li>
    ),
  },
};
