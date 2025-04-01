import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { getPostsByCategory } from "../utils/sanity"; 
import { urlFor } from "../utils/image"; 
import type { Post } from "../utils/sanity"; 

export default function Header() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]); 

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPostsByCategory("DESTACADOS");
      setFeaturedPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <Swiper
    spaceBetween={30}
    effect={"fade"}
    navigation={true}
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000, disableOnInteraction: false }} 
    modules={[EffectFade, Navigation, Pagination]}
    className="mySwiper"
    >
      {featuredPosts.length > 0 ? (
        featuredPosts.map((post) => (
          <SwiperSlide key={post.slug.current}>
            <div style={{
            width: "100%",
            height: "400px", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}>
            {post.mainImage ? (
              <img
                style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "9 / 16",
                    objectFit: "cover"
                }}
                className="post__cover"
                src={urlFor(post.mainImage).url()}
                alt={post.title || "Imagen del post"}
              />
            ) : (
              <div 
              style={{
                width: "100%",
                height: "100%",
                background: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: "#666"
              }} className="post__cover--none">Sin imagen</div>
            )}
          </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="loading">Cargando...</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
