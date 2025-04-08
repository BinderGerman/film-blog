import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  author: string;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  categories: string[];
  body: PortableTextBlock[];
}