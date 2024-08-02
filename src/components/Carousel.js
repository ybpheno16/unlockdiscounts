
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
  const brandList = [
    '/banners/amazon.png',
    '/banners/myntra.png',
    '/banners/meesho.png',
    '/banners/flipkart.png',
    '/banners/ajio.png',
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
    // <div className="carousel">
    //   {slides.map((slide, index) => (
    //     <div key={index} className={index === activeIndex ? "carousel-item active" : "carousel-item"}>
    //       <img src={slide} alt={`Slide ${index + 1}`} />
    //     </div>
    //   ))}
    // </div>
    <div className='bannerContainer'>
    <img className='bannerImage' src='/banners/staticBanner.png'/>
    <div className='contentContainer'>
      <h1>FIND DEALS THAT FITS IN YOUR BUDGET </h1>
      <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>

      <button className='shopNowCTA'>Shop Now</button>

      <div className='info-container'>
        <div>
          <h2>200+</h2>
          <p>International Brands</p>
        </div>
        <div>
          <h2>2,000+</h2>
          <p>High-Quality Products</p>
        </div>
        <div>
          <h2>30,000+</h2>
          <p>Happy Customers</p>
        </div>
      </div>
    </div>
    <div className='brand-banner'>
      {brandList?.map(brands => {
        return <img className='brand-logo' src={brands} />
      })}
    </div>
  </div>
  );
}

export default Carousel;

