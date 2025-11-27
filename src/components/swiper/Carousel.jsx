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
      slidesPerView={3}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      parallax={true}
      spaceBetween={400}
      speed={1500}
      centeredSlides={true}
      breakpoints={{
        // When window width is >= 320px
        320: {
          slidesPerView: 1,
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
            <img
              src={imageSrc}
              alt={`Foto de Alba y Andrea ${index + 1}`}
              data-swiper-parallax="-40%"
              data-swiper-parallax-scale="0.6"
            />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
