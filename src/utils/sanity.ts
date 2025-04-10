import { sanityClient } from "sanity:client";
import groq from "groq";

import type { Category } from "../types/category";
import type { Post } from "../types/post";
import type { CategoryWithPosts } from "../types/categoryWithPosts";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getPostsByCategory(
  categoryName: string
): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && $categoryName in categories[]->title] | order(_createdAt desc)`,
    { categoryName }
  );
}

// Importa listado de categorías para el menú excepto las destacadas
export async function getCategories(): Promise<Category[]> {
  return await sanityClient.fetch(
    groq`*[_type == "category" && title != "DESTACADOS"]{
        _id,
        title,
        slug,
        description
      }`
  );
}

// Importa listado de Posts divididos por categoría
export async function getPostsGroupedByCategory(): Promise<CategoryWithPosts[]> {
  return await sanityClient.fetch(
    `*[
      _type == "category" && 
      title != "DESTACADOS" && 
      count(*[_type == "post" && references(^._id)]) > 0
    ] | order(order asc){
      _id,
      title,
      slug,
      "posts": *[_type == "post" && references(^._id)] | order(_createdAt desc)[0...5]{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt
      }
    }`
  );
}

export async function getPostsByCategorySlug(slug: string, page: number, pageSize = 20): Promise<Post[]> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return await sanityClient.fetch(
    `*[
      _type == "post" && 
      references(*[_type == "category" && slug.current == $slug]._id)
    ] | order(_createdAt desc)[$start...$end]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage
    }`,
    { slug, start, end }
  );
}

export async function getTotalPostsByCategory(slug: string): Promise<number> {
  return await sanityClient.fetch(
    `count(*[
      _type == "post" &&
      references(*[_type == "category" && slug.current == $slug]._id)
    ])`,
    { slug }
  );
}

