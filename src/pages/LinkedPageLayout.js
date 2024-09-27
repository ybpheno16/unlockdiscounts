import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import FilterBox from "../components/FilterBox";
import "./productgallery.css";

const LinkedPageLayout = ({
  category,
  title,

  //for pagination
  page = 1,
  extraPage,
  handleLoadMoreProducts,
}) => {
  const { state, handleLoadMore, hasMore } = useContext(ProductContext);
  const { products, loading, error } = state;
  const [filterOpen, setFilterOpen] = useState(false);

  // const products = products.filter(
  //   (product) => product.category === category
  // );
  const totalProducts = products.length;

  useEffect(() => {
    console.log("Products: in trending => ", products);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasMore
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, handleLoadMore]);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // function to load more products
  const handleNextPage = (page) => {
    const url = window.location.href;
    let queryString = url ? url.split("?")[1] : "";
    console.log("queryString", queryString);

    if (!queryString) {
      queryString += `page=${page}`;
    }
    if (queryString && !queryString.includes("page")) {
      queryString += `&page=${page}`;
    }
    let updatedQuery = queryString.split("&").map((item) => {
      if (item.includes("page")) {
        return `page=${page}`;
      }
      return item;
    });

    updatedQuery = updatedQuery.join("&");
    let updatedQueryString = url.split("?")[0] + "?" + updatedQuery;

    console.log("updatedQuery", updatedQuery);
    window.open(updatedQueryString, "_self");
    handleLoadMoreProducts(updatedQuery);
  };
  if (loading && products.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="layout-container">
      {/* Filter Box for larger screens */}
      <div className="filter-box">
        <FilterBox />
      </div>

      {/* Product gallery */}
      <div className="productpage-container">
        <div className="title-container">
          <h2 className="category-title">{title}</h2>
          <div className="title-info">
            <p className="product-count">
              {products.length} out of {totalProducts} products
            </p>
            <img
              className="filter-icon"
              src="/path-to-filter-icon.png" // Ensure this path is correct
              alt="Filter Icon"
              onClick={toggleFilter}
            />
          </div>
        </div>
        <div className="product-cards">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img loading="lazy" src={product.image} alt={product.title} />
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-now-button"
                >
                  BUY NOW
                </a>
              </div>
            </div>
          ))}
        </div>

        {products && products.length >= 3 && (
          <div
            className="pagination-buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              margin: "20px 0",
              // backgroundColor: "red",
              marginTop: "20px",
            }}
          >
            {page > 1 && (
              <button
                // onClick={() => setPage((prevPage) => prevPage - 1)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleNextPage(page - 1)}
              >
                Prev
              </button>
            )}

            <button
              // onClick={() => setPage((prevPage) => prevPage + 1)}
              style={{
                backgroundColor: "black",
                color: "white",
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => handleNextPage(page)}
            >
              {page}
            </button>

            {extraPage > 0 && (
              <button
                // onClick={() => setPage((prevPage) => prevPage + 1)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleNextPage(page + 1)}
              >
                {page + 1}
              </button>
            )}

            {extraPage > 1 && (
              <button
                // onClick={() => setPage((prevPage) => prevPage + 1)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleNextPage(page + 2)}
              >
                More
              </button>
            )}
          </div>
        )}

        {loading && <div>Loading more products...</div>}
      </div>

      {/* Fullscreen Filter Overlay */}
      {filterOpen && (
        <div className="filter-overlay open">
          <button onClick={toggleFilter} className="close-button">
            Close
          </button>
          <FilterBox />
        </div>
      )}
    </div>
  );
};

export default LinkedPageLayout;
