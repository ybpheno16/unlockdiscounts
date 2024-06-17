// MensWear.js
import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./FashionLayout')));


function MensWear() {
  const category = "Men's Wear";
  const bannerImage = "/fashion/menswearbanner1.jpg"; 

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default MensWear;
