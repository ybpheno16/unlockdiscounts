import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import productReducer from "../reducers/productReducer";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const initialState = {
    products: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://products2-tt3o.onrender.com/api/products?page=${page}&limit=20`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      }
      dispatch({
        type: "FETCH_SUCCESS",
        payload: [...state.products, ...response.data],
      });
    } catch (error) {
      // dispatch({ type: "FETCH_ERROR", payload: error.message });
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  useEffect(() => {
    // Fetch first page of products on initial render
    setPage(1);
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, setPage, hasMore, handleLoadMore }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
