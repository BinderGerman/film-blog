import type { ImageAsset } from "@sanity/types";

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: ImageAsset & { alt?: string };
  description?: string;
}
