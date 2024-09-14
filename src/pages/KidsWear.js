import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./LinkedPageLayout')));

function KidsWear() {
  const title = "KIDS";
  const category = "Kid's Wear";
  return <FashionLayout category={category} title={title}  />;
}

export default KidsWear;



