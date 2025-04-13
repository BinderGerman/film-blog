import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import type { Tag } from "./tag";
import type { Category } from "./category";

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  author: string;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  categories: Category[];
  tags?: Tag[]
  body: PortableTextBlock[];
}