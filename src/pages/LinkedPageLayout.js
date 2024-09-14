import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import FilterBox from '../components/FilterBox';  // Import the FilterBox component
import './productgallery.css';

const LinkedPageLayout = ({ category, title }) => {
  const { state, handleLoadMore, hasMore } = useContext(ProductContext);
  const { products, loading, error } = state;

  const filteredProducts = products.filter(product => product.category === category);
  const totalProducts = products.length;  // Assume you have the total number of products available

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, handleLoadMore]);

  if (loading && filteredProducts.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="layout-container">
      {/* Left side: Filter box */}
      <FilterBox />

      {/* Right side: Product gallery */}
      <div className="productpage-container">
        <div className="title-container">
          <h2 className="category-title">{title}</h2>
          <p className="product-count">
            {filteredProducts.length} out of {totalProducts} products
          </p>
        </div>
        <div className="product-cards">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img loading="lazy" src={product.image} alt={product.title} />
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">
                  BUY NOW
                </a>
              </div>
            </div>
          ))}
        </div>
        {loading && <div>Loading more products...</div>}
      </div>
    </div>
  );
};

export default LinkedPageLayout;
