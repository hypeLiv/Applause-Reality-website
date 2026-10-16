import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { absolute } from "@/lib/seo";

// Privacy policy is noindex, so it stays out.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absolute("/"), changeFrequency: "weekly", priority: 1 },
    { url: absolute("/projects"), changeFrequency: "weekly", priority: 0.9 },
    { url: absolute("/about-applause-reality"), changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absolute("/testimonials"), changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/consultation"), changeFrequency: "yearly", priority: 0.6 },
  ];
  return [
    ...pages,
    ...projects.map((p) => ({
      url: absolute(`/projects/${p.key}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absolute(`/blog/${p.slug}`),
      ...(p.date ? { lastModified: p.date } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
