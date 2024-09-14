import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const BeautyLayout = lazyLoad(lazy(() => import('./LinkedPageLayout')));

function Beauty() {
  const title = "BEAUTY";
  const category = "Electroincs";
  return <BeautyLayout category={category} title={title}  />;
}

export default Beauty;



