// WomensWear.js
import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import axios from "axios";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const FashionLayout = lazyLoad(lazy(() => import("./LinkedPageLayout")));

function WomensWear() {
  const title = "WOMENS";
  const category = "Women's Wear";

  const pathName = useLocation();
  const { dispatch } = useContext(ProductContext);
  const [extraPage, setExtraPage] = useState(1);
  const [page, setPage] = useState(1);

  const pageFromQuery = new URLSearchParams(pathName.search).get("page");

  const fetchWomensWear = async (query = "", banner = "") => {
    console.log("query", query);
    let res;
    if (banner === "latest") {
      console.log("banner", banner);
      res = await axios.get(
        `http://localhost:8080/api/banner/latest?${query}&mainCategory=womenswear`
      );
    } else {
      res = await axios.get(`http://localhost:8080/api/womenswear?${query}`);
    }
    const data = res.data;
    setPage(parseInt(pageFromQuery) || 1);

    if (data.success) {
      // console.log("data", data.womenswear);
      console.log("extraPage", data.extraPages);

      if (banner === "latest") {
        dispatch({ type: "SET_PRODUCTS", payload: data?.products });
      } else {
        dispatch({ type: "SET_PRODUCTS", payload: data.womenswear });
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

    console.log("queryString", queryString);
    fetchWomensWear(queryString, checkBanner[checkBanner.length - 1]);
  }, [pathName]);

  return (
    <FashionLayout
      category={category}
      title={title}
      // passed below props for pagination
      page={page}
      extraPage={extraPage}
      handleLoadMoreProducts={fetchWomensWear}
    />
  );
}

export default WomensWear;
