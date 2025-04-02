/*import React, { useEffect, useState } from "react";
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
}*/

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Si deseas combinarlo con fade
import { Parallax, Pagination, Navigation } from "swiper/modules";
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
    <>
      <Swiper
        /*style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}*/
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Fondo parallax para el slider */}
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage: 'url(https://swiperjs.com/demos/images/nature-1.jpg)',
          }}
          data-swiper-parallax="-23%"
        ></div>

        {featuredPosts.map((post) => (
          <SwiperSlide key={post.slug.current}>
            <div
              style={{
                position: "relative",
                height: "400px", // Ajusta el tamaño si es necesario
                //backgroundColor: "#000",
              }}
            >
              {/* Fondo parallax de la imagen del post */}
              {post.mainImage && (
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlFor(post.mainImage).url()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    //filter: "brightness(0.1)", // Para darle un filtro oscuro y hacer el texto legible
                    zIndex: -1,
                  }}
                  data-swiper-parallax="-30%"
                />
              )}

              {/* Título y texto del post */}
              <div
                className="title"
                style={{
                  position: "absolute",
                  top: "65%",
                  left: "2%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
                data-swiper-parallax="-300"
              >
                {post.title}
              </div>

              <div
                className="excerpt"
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "2%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "lighter",
                }}
                data-swiper-parallax="-200"
              >
                {post.excerpt}
              </div>

              {/* Categoría 
              <div
                className="category"
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                data-swiper-parallax="-100"
              >
                {post.category ? post.category.title : "Sin categoría"}
              </div>*/}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
