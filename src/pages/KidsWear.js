import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./FashionLayout')));

function KidsWear() {
  const category = "Kid's Wear";
  const bannerImage = "/fashion/kidswearbanner2.avif"; 
  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default KidsWear;



