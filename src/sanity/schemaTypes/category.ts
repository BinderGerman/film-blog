import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  type: "document",
  title: "Categoría",
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
    defineField({
      name: "mainImage",
      title: "Imagen de Portada",
      description: "Imagen para representar la categoría",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo",
        },
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Descripción",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Orden de aparición",
      description:
        "Usá este campo para definir el orden en que se muestran las categorías.",
    }),
  ],
});
