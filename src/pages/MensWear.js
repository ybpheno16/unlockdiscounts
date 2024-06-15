// MensWear.js
import React from 'react';
import FashionLayout from './FashionLayout';

function MensWear() {
  const category = "Men's Wear";
  const bannerImage = "/fashion/menswearbanner1.jpg"; // Replace with your banner image path

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default MensWear;
