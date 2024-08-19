
import React, { useState, useEffect } from 'react';
import './carousel.css';

function Carousel() {
  return (
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
  </div>
  );
}

export default Carousel;

