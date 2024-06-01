import React from 'react';
import FashionLayout from './FashionLayout';

function WomensWear() {
  const category = "womens-wear";
  const bannerImage = "/womenswearbanner.png"; // Replace with your banner image path

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default WomensWear;