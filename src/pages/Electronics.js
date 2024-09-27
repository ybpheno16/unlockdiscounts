import axios from "axios";
import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useLocation } from "react-router-dom";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const ElectroincsLayout = lazyLoad(lazy(() => import("./LinkedPageLayout")));

function Electronics() {
  const title = "HOME & LIVING";
  const category = "Electroincs";

  const pathName = useLocation();
  const { dispatch } = useContext(ProductContext);
  const [extraPage, setExtraPage] = useState(1);
  const [page, setPage] = useState(1);

  const pageFromQuery = new URLSearchParams(pathName.search).get("page");

  // this page is on;y for latest products yet so just fetching latest products
  const fetchElectronics = async (query = "") => {
    try {
      let res;
      res = await axios.get(
        `http://localhost:8080/api/banner/latest?${query}&category=Electronics`
      );
      const data = res.data;
      console.log("data", data);

      setPage(parseInt(pageFromQuery) || 1);
      if (data.success) {
        console.log("data", data);
        dispatch({ type: "SET_PRODUCTS", payload: data?.products });
        setExtraPage(data.extraPages);
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
    const query = url.split("?")[1];
    fetchElectronics(query);
  }, []);
  return (
    <ElectroincsLayout
      category={category}
      title={title}
      page={page}
      extraPage={extraPage}
      handleLoadMoreProducts={fetchElectronics}
    />
  );
}

export default Electronics;
