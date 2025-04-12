import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  type: "document",
  title: "Etiquetas",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Título",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
