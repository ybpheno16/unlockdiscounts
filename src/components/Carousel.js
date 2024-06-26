import React, { useState, useEffect } from 'react';
import './carousel.css';

function Carousel() {
  // State to keep track of the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of slide image URLs
  const slides = [
    "/banners/slide 1.jpg",
    "/banners/slide 2.jpg",
    "/banners/slide 3.jpg",
    "/banners/slide 4.jpg",
    "/banners/slide 5.jpg"
    
  ];

  // Function to handle moving to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Use useEffect to automatically transition to the next slide every 3 seconds
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
