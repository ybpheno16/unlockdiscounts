// MensWear.js
import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./LinkedPageLayout')));


function MensWear() {
  const title = "MENS";
  const category = "Men's Wear";

  return <FashionLayout category={category} title={title}  />;
}

export default MensWear;
