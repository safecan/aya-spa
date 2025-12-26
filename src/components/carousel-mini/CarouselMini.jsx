import { useState, useEffect } from "react";
import "./CarouselMini.css";

export default function CarouselMini({ images = [], interval = 4500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setFadeOut(true);
      
      setTimeout(() => {
        setFadeOut(false);
        setFadeIn(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 650);

      setTimeout(() => {
        setFadeIn(false);
      }, 750);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="carousel-mini-container">
      <img
        src={images[currentIndex]}
        className={`carousel-mini-image ${fadeOut ? "fade-out" : ""} ${
          fadeIn ? "fade-in" : ""
        }`}
      />
    </div>
  );
}