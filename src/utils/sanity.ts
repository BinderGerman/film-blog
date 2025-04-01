import { sanityClient } from "sanity:client";
import groq from "groq";
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
    body: PortableTextBlock[]

}

export async function getPosts(): Promise<Post[]> {
    return await sanityClient.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
    )
}

export async function getPost(slug: string): Promise<Post> {
    return await sanityClient.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]`,
        {
            slug,
        }
    )
}

export async function getPostsByCategory(categoryName: string): Promise<Post[]> {
    return await sanityClient.fetch(
        groq`*[_type == "post" && $categoryName in categories[]->title] | order(_createdAt desc)`,
        { categoryName }
    );
}

