import React, { Suspense, lazy } from 'react';

const lazyLoad = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const ElectroincsLayout = lazyLoad(lazy(() => import('./LinkedPageLayout')));

function Electronics() {
  const title = "HOME & LIVING";
  const category = "Electroincs";
  return <ElectroincsLayout category={category} title={title}  />;
}

export default Electronics;



