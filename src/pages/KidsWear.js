import React from 'react';
import FashionLayout from './FashionLayout';

function KidsWear() {
  const category = "Kid's Wear";
  const bannerImage = "/kidswearbanner2.png"; // Replace with your banner image path

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default KidsWear;
