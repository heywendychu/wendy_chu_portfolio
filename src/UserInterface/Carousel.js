import "swiper/swiper-bundle.css";

import React, { useState } from "react";
import ImageGroup from "./ImageGroup";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

const SwiperWrapper = styled.div`
  width: 100%;
  min-width: 0; /* 👈 CRITICAL: Stops flexboxes from stretching infinitely */
  overflow: hidden; /* 👈 Prevents the slides from bleeding outward */

  max-width: 840px;
`;

const CarouselContainer = styled.div`
  display: flex;

  .swiper-prev-override,
  .swiper-next-override {
    height: 100%;
    align-self: center;
    margin: 10px;
    cursor: pointer;
  }
`;

export const Carousel = ({ children }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <CarouselContainer>
      <div class="swiper-prev-override">{"<"}</div>
      <SwiperWrapper>
        <Swiper
          modules={[Pagination, Mousewheel, Navigation, Scrollbar, Thumbs]}
          onSwiper={(swiper) => (window.swiper = swiper)}
          slidesPerView={1}
          threshold={2}
          spaceBetween={0}
          navigation={{
            prevEl: ".swiper-prev-override",
            nextEl: ".swiper-next-override",
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.1,
            releaseOnEdges: true,
          }}
          loop
          thumbs={{ swiper: thumbsSwiper }}
          autoHeight={true}
        >
          {children.map((c) => (
            <SwiperSlide>{c}</SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={5}
          spaceBetween={10}
        >
          {children.map((c) => {
            var child = c;
            if (c.type === ImageGroup) {
              child = (
                <img
                  width="100%"
                  style={{ width: "100%", cursor: "pointer" }}
                  src={`/images/${c.props.desktop}`}
                  alt={c.props.alt}
                ></img>
              );
            }

            return <SwiperSlide>{child}</SwiperSlide>;
          })}
        </Swiper>
      </SwiperWrapper>
      <div class="swiper-next-override">{">"}</div>
    </CarouselContainer>
  );
};
