import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./FashionLayout')));


function WomensWear() {
  const category = "Women's Wear";
  const bannerImage = "/banners/slide 2.avif"; 

  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default WomensWear;