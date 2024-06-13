import React from 'react';
import ElectronicsCategoryLayout from './ElectronicsCategoryLayout';

function Appliances() {
  const category = "Appliances"; // Match this with the category in your products
  const bannerImage = "/electronincsbanner.png";
 

  return <ElectronicsCategoryLayout category={category} bannerImage={bannerImage} />;
}

export default Appliances;
