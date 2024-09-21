import React, { Suspense, lazy } from "react";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const FashionLayout = lazyLoad(lazy(() => import("./LinkedPageLayout")));

function KidsWear() {
  const title = "KIDS";
  const category = "Kid's Wear";
  // Checking if the category is available in the database
  return <FashionLayout category={category} title={title} />;
}

export default KidsWear;
