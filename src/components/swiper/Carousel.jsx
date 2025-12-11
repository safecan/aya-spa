import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

const Carousel = ({ images = [] }) => {
  const swiperRef = useRef(null);

  // Disable transitions on initial render to prevent unwanted animations
  useEffect(() => {
    // Disable transitions on mount
    if (swiperRef.current) {
      const slides = swiperRef.current.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.style.transition = 'none';
      });

      // Re-enable transitions after a short delay
      setTimeout(() => {
        slides.forEach(slide => {
          slide.style.transition = '';
        });
      }, 100);
    }
  }, []);

  return (
    <div ref={swiperRef}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{
          enabled: true,
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        parallax={true}
        spaceBetween={400}
        speed={2000}
        centeredSlides={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            navigation: false,
          },
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;