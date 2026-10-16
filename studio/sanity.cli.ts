import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Hosted at https://<studioHost>.sanity.studio after `npm run deploy`.
  studioHost: "applause-reality",
  // Lets `npm run deploy` update the hosted Studio without prompting for which app.
  deployment: { appId: "p3yu1atotesq0vq6zw2r4gji" },
  typegen: {
    path: "../src/sanity/**/*.ts",
    schema: "./schema.json",
    generates: "../src/sanity/types.ts",
  },
});
