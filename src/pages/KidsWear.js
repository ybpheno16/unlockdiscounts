import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./FashionLayout')));

function KidsWear() {
  const category = "Kid's Wear";
  const bannerImage = "https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328190/kidswearbanner2_jypdsh.png"; 
  return <FashionLayout category={category} bannerImage={bannerImage} />;
}

export default KidsWear;



