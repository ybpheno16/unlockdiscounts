
import React, { useState, useEffect } from 'react';
import './carousel.css';

function Carousel() {
  // State to keep track of the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of slide image URLs
  const slides = [
    "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328894/slide-1_w5npro.jpg",
    "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328933/slide-2_ibse0k.jpg",
    "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328226/slide_3_peumsu.png",
    "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328226/slide_4_shabup.png",
    "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328226/slide_5_egri89.png"
  ];  //Used Cloudinary for creating a virtual link for those images

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
          <img loading='lazy' src={slide} alt={`Slide ${index + 1}`} />  {/* Added Loading Lazy */ }
        </div>
      ))}
    </div>
  );
}

export default Carousel;

