import React from 'react';
import FashionLayout from './FashionLayout';

function KidsWear() {
  const category = "Kids-wear";
  const bannerImage = "/kidswearbanner.png"; // Replace with your banner image path

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default KidsWear;
