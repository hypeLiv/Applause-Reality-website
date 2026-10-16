import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website content")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials").defaultOrdering([{ field: "rank", direction: "asc" }])),
      S.divider(),
      S.documentTypeListItem("partner").title("Partners"),
      S.listItem()
        .title("Awards")
        .schemaType("award")
        .child(S.documentTypeList("award").title("Awards").defaultOrdering([{ field: "rank", direction: "asc" }])),
    ]);
