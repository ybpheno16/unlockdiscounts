import axios from "axios";
import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const FashionLayout = lazyLoad(lazy(() => import("./LinkedPageLayout")));

function HomeAndLiving() {
  const title = "Home and Living";
  const category = "Kid's Wear";
  
  const pathName = useLocation();

  const { dispatch, state } = useContext(ProductContext);
  const [extraPage, setExtraPage] = useState(1);
  const [page, setPage] = useState(1);

  const pageFromQuery = new URLSearchParams(pathName.search).get("page");

  // console.log("query => ", query);

  const fetchHomeAndAppliance = async (query) => {
    console.log("query", query);
    const res = await axios.get(`http://localhost:8080/api/appliances?${query}`);
    const data = res.data;
    setPage(parseInt(pageFromQuery) || 1);

    if (data.success) {
      console.log("data", data.appliance);
      console.log("extraPage", data.extraPages);

      setExtraPage(data.extraPages);
      dispatch({ type: "SET_PRODUCTS", payload: data.appliance });
    }

    if (!data.success) {
      dispatch({ type: "FETCH_ERROR", payload: data.message });
    }
    console.log("res", res.data);
  };

  useEffect(() => {
    const url = window.location.href;
    const queryString = url ? url.split("?")[1] : "";
    console.log("queryString", queryString);
    fetchHomeAndAppliance(queryString);
  }, [pathName]);

  // Checking if the category is available in the database
  return (
    <FashionLayout
      category={category}
      title={title}
      page={page}
      extraPage={extraPage}
      handleLoadMoreProducts={fetchHomeAndAppliance}
    />
  );
}

export default HomeAndLiving;
