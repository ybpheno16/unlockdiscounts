import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../contexts/ProductContext";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const BeautyLayout = lazyLoad(lazy(() => import("./LinkedPageLayout")));

function Beauty() {
  const title = "BEAUTY";
  const category = "Beauty & Personal Care";

  const pathName = useLocation();
  const { dispatch } = useContext(ProductContext);
  const [extraPage, setExtraPage] = useState(1);
  const [page, setPage] = useState(1);

  const pageFromQuery = new URLSearchParams(pathName.search).get("page");

  const fetchBeautyProducts = async (query = "", banner = "") => {
    try {
      let res;
      if (banner === "latest") {
        console.log("banner", banner);
        res = await axios.get(
          `http://localhost:8080/api/banner/latest?${query}&mainCategory=beauty`
        );
      } else {
        res = await axios.get(`http://localhost:8080/api/beauty?${query}`);
      }
      const data = res.data;

      setPage(parseInt(pageFromQuery) || 1);

      if (data.success) {
        console.log("data", data);
        setExtraPage(data.extraPages);

        if (banner === "latest") {
          dispatch({ type: "SET_PRODUCTS", payload: data?.products });
        } else {
          dispatch({ type: "SET_PRODUCTS", payload: data.beautyProduct });
        }
      } else {
        dispatch({ type: "FETCH_ERROR", payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "An error occurred while fetching products.",
      });
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const queryString = url ? url.split("?")[1] : "";
    const checkBanner = url.split("?")[0].split("/");
    console.log("checkBanner", checkBanner);
    console.log("queryString", queryString);

    fetchBeautyProducts(queryString, checkBanner[checkBanner.length - 1]);
  }, [pathName]);

  return (
    <BeautyLayout
      category={category}
      title={title}
      page={page}
      extraPage={extraPage}
      handleLoadMoreProducts={fetchBeautyProducts}
    />
  );
}

export default Beauty;
