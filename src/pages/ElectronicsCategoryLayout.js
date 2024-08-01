
import React, { useContext, useMemo } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './productgallery.css';

function ElectronicsCategoryLayout({ category, bannerImage }) {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  // Memoize filtered products to avoid unnecessary recalculations
  const filteredProducts = useMemo(() => {
    return Array.isArray(products) ? products.filter(product => product.category === category) : [];
  }, [products, category]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productpage-container">
      <h1 className="maincategory-title">Electronics</h1>
      <p className="subdes">Unlock Innovation: Explore Cutting-Edge Electronics at Unbeatable Prices!</p>
      <div className="common-banner">
        <img loading='lazy' src={bannerImage} alt={`${category} Banner`} className="common-banner-image" />
      </div>
      <h2 className="category-title">{category}</h2>
      <div className="product-cards">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-details">
              <div className="product-image">
                <img src={product.image} alt={product.title} loading="lazy" />
              </div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElectronicsCategoryLayout;
