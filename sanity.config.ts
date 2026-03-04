import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Diva Ahmad Pradana",

  projectId: "7aln3s6t",
  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput(), table()],

  schema: {
    types: schemaTypes,
  },
});
