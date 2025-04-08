import type { Post } from "./post";

export interface CategoryWithPosts {
    _id: string;
    title: string;
    slug: { current: string };
    posts: Post[];
}