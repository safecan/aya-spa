import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

const Carousel = ({ images = [] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Parallax]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      parallax={true}
      speed={1350}
      style={{
        aspectRatio: "4/3",
        maxWidth: "900px",
        margin: "0",
        overflow: "visible",
      }}
      centeredSlides={true}
      breakpoints={{
        // When window width is >= 320px
        320: {
          navigation: false,
        },
        // When window width is >= 769px
        769: {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
      }}
    >
      {images.map((imageSrc, index) => (
        <SwiperSlide key={index}>
          <div className="slide-content" data-swiper-parallax-opacity="0.5">
            <img
              src={imageSrc}
              alt={`Foto de Alba y Andrea ${index + 1}`}
              data-swiper-parallax="-40%"
              data-swiper-parallax-scale="0.6"
            />
          </div>
        </SwiperSlide>
      ))}
      <br/>
    </Swiper>
  );
};

export default Carousel;
