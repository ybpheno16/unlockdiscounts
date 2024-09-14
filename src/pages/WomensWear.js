import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const FashionLayout = lazyLoad(lazy(() => import('./FashionLayout')));


function WomensWear() {
  const title = "WOMENS";
  const category = "Women's Wear";

  return <FashionLayout category={category} title={title}/>;
}

export default WomensWear;