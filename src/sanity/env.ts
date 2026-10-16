/** Sanity connection. With no project ID the site serves its bundled media from /public. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-02-01";

export const sanityEnabled = projectId !== "";
