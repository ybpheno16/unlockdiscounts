import React from 'react';
import ElectronicsCategoryLayout from './ElectronicsCategoryLayout';

function Appliances() {
  const category = "Appliances"; // Match this with the category in your products
 

  return <ElectronicsCategoryLayout category={category} />;
}

export default Appliances;
