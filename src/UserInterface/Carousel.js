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
  .slider-parent-container {
    width: 100%;
    min-width: 0; /* 👈 CRITICAL: Stops flexboxes from stretching infinitely */
    overflow: hidden; /* 👈 Prevents the slides from bleeding outward */
  }
`;

export const Carousel = ({ children }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <SwiperWrapper>
      <Swiper
        modules={[Pagination, Mousewheel, Navigation, Scrollbar, Thumbs]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={1}
        threshold={2}
        spaceBetween={0}
        navigation={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.1,
          releaseOnEdges: true,
        }}
        loop
        thumbs={{ swiper: thumbsSwiper }}
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
  );
};
