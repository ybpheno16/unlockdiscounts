import axios from "axios";
import React, { Suspense, lazy, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

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
  const pathName = useLocation();
  const { dispatch, state } = useContext(ProductContext);

  const fetchKidsWear = async (query) => {
    const res = await axios.get(`http://localhost:8080/api/kidswear?${query}`);

    const data = res.data;
    if (data.success) {
      console.log("data", data.kidswear);
      dispatch({ type: "SET_PRODUCTS", payload: data.kidswear });
    }
    console.log("res", res.data);
  };

  useEffect(() => {
    const url = window.location.href;
    const queryString = url ? url.split("?")[1] : "";

    console.log("queryString", queryString);
    fetchKidsWear(queryString);
  }, [pathName]);

  // Checking if the category is available in the database
  return <FashionLayout category={category} title={title} />;
}

export default KidsWear;
