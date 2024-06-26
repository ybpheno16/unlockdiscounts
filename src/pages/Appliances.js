import React, { Suspense, lazy } from 'react';

const ElectronicsCategoryLayout = lazy(() => import('./ElectronicsCategoryLayout'));

function Appliances() {
  const category = "Appliances"; // Match this with the category in your products
  const bannerImage = "/fashion/electronincsbanner.avif";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ElectronicsCategoryLayout category={category} bannerImage={bannerImage} />
    </Suspense>
  );
}

export default Appliances;
