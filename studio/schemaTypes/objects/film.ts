import { PlayIcon } from "@sanity/icons/Play";
import { defineField, defineType } from "sanity";
import { imageField, videoField } from "../shared/image-field";

/** A playable film with a poster frame, e.g. a sample-flat walkthrough. */
export const film = defineType({
  name: "film",
  title: "Film",
  type: "object",
  icon: PlayIcon,
  fields: [
    videoField({ name: "video", title: "Video", required: true }),
    imageField({ name: "poster", title: "Poster frame", description: "Shown before the film plays.", required: true }),
    defineField({
      name: "title",
      title: "Title",
      description: "Read out to screen readers, e.g. \"Godrej Arden sample flat\".",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "Landscape", value: "landscape" },
          { title: "Portrait (phone-shot)", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
    }),
  ],
  preview: {
    select: { title: "title", media: "poster" },
  },
});
