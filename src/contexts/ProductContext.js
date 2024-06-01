import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import productReducer from '../reducers/productReducer';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const initialState = {
    products: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://products2-tt3o.onrender.com/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
