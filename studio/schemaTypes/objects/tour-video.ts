import { PlayIcon } from "@sanity/icons/Play";
import { defineType } from "sanity";
import { imageField, videoField } from "../shared/image-field";

/** A silent background video the page plays as the visitor scrolls, with a lighter cut for phones. */
export const tourVideo = defineType({
  name: "tourVideo",
  title: "Scroll tour video",
  type: "object",
  icon: PlayIcon,
  fields: [
    videoField({
      name: "video",
      title: "Video (desktop)",
      description: "Silent, encoded with frequent keyframes so it scrubs smoothly.",
      required: true,
    }),
    videoField({ name: "mobileVideo", title: "Video (phones)", description: "A smaller cut for mobile data." }),
    imageField({ name: "poster", title: "Poster frame", description: "Shown while the video loads.", required: true }),
  ],
  preview: {
    select: { media: "poster" },
    prepare: ({ media }) => ({ title: "Scroll tour video", media }),
  },
});
