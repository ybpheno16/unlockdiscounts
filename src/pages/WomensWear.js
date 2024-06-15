import React from 'react';
import FashionLayout from './FashionLayout';

function WomensWear() {
  const category = "Women's Wear";
  const bannerImage = "/banners/slide 2.jpg"; // Replace with your banner image path

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default WomensWear;
