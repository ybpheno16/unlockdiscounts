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

function KidsWear() {
  const title = "KIDS";
  const category = "Kid's Wear";

  const pathName = useLocation();

  const { dispatch, state } = useContext(ProductContext);
  const [extraPage, setExtraPage] = useState(1);
  const [page, setPage] = useState(1);

  const pageFromQuery = new URLSearchParams(pathName.search).get("page");
  // read params from the URL
  const isLatest = new URLSearchParams(pathName.search).get("latest");

  // console.log("query => ", query);

  // Fetching products from the database
  const fetchKidsWear = async (query = "", banner = "") => {
    console.log("query", query);

    let res;
    if (banner === "latest") {
      res = await axios.get(
        `http://localhost:8080/api/banner/latest?${query}&mainCategory=kidswear`
      );
    } else {
      res = await axios.get(`http://localhost:8080/api/kidswear?${query}`);
    }
    const data = res.data;
    setPage(parseInt(pageFromQuery) || 1);

    if (data.success) {
      console.log("data", data.kidswear);
      console.log("extraPage", data.extraPages);

      if (banner === "latest") {
        dispatch({ type: "SET_PRODUCTS", payload: data?.products });
      } else {
        dispatch({ type: "SET_PRODUCTS", payload: data.kidswear });
      }
      setExtraPage(data.extraPages);
    }

    if (!data.success) {
      dispatch({ type: "FETCH_ERROR", payload: data.message });
    }
    console.log("res", res.data);
  };

  useEffect(() => {
    const url = window.location.href;
    const queryString = url ? url.split("?")[1] : "";
    const checkBanner = url.split("?")[0].split("/");
    console.log("checkBanner", checkBanner);
    console.log("queryString", queryString);

    // if(checkBanner[checkBanner.length - 1]) {
    // queryString += "&latest=true"
    fetchKidsWear(queryString, checkBanner[checkBanner.length - 1]);

    console.log("checkBanner", checkBanner);
  }, [pathName]);

  // Checking if the category is available in the database
  return (
    <FashionLayout
      category={category}
      title={title}
      page={page}
      extraPage={extraPage}
      handleLoadMoreProducts={fetchKidsWear}
    />
  );
}

export default KidsWear;
