
import React, { useState, useEffect } from 'react';
import './carousel.css';

function Carousel() {
  // State to keep track of the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of slide image URLs
  const slides = [
    "/banners/slide 1.avif",
    "/banners/slide 2.avif",
    "/banners/slide 3.avif",
    "/banners/slide 4.avif",
    "/banners/slide 5.avif"
  ];

  // Function to handle moving to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = slide;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }, [slides]);

  // Use useEffect to automatically transition to the next slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div key={index} className={index === activeIndex ? "carousel-item active" : "carousel-item"}>
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Carousel;

