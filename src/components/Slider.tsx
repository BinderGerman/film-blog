import { useEffect, useState } from "react";
import type { Post } from "../utils/sanity";
import { getPostsByCategory } from "../utils/sanity";
import { urlFor } from "../utils/image";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";


interface SliderProps {
  category?: string;
}

export const Slider = ({ category }: SliderProps) => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const selectedCategory = category || "DESTACADOS";
        const posts = await getPostsByCategory(selectedCategory);
        setFeaturedPosts(posts);
        console.log("hola");
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
        console.log("chau");
      }
    }

    fetchPosts();
  }, [category]);

  return (
    <>
      <Swiper
        speed={600}
        effect={"fade"}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {featuredPosts.map((post) => (
          <SwiperSlide key={post.slug.current}>
            <a
              href={`/post/${post.slug.current}`}
              style={{ textDecoration: "none" }}
            >
              <div className="relative h-[400px]">
                {post.mainImage && (
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlFor(post.mainImage).url()})`,
                    }}
                  />
                )}
                <div className="absolute top-[65%] left-[2%] text-principal text-4xl font-bold">
                  {post.title}
                </div>

                <div className="absolute top-[75%] left-[2%] text-principal text-2xl font-light">
                  {post.excerpt}
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
