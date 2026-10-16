import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Hosted at https://<studioHost>.sanity.studio after `npm run deploy`.
  studioHost: "applause-reality",
  typegen: {
    path: "../src/sanity/**/*.ts",
    schema: "./schema.json",
    generates: "../src/sanity/types.ts",
  },
});
