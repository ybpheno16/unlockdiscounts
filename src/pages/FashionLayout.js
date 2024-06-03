// FashionLayout.js
import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './productgallery.css';

function FashionLayout({ category, bannerImage }) {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  const filteredProducts = products.filter(product => product.category === category);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productpage-container">
      <h1 className="maincategory-title">Fashion</h1>
      <p className="subdes">Unlock Style: Elevate Your Wardrobe with Trendy Fashion Finds!</p>
      <div className="common-banner">
        <img src={bannerImage} alt={`${category} Banner`} className="common-banner-image" />
      </div>
      <h2 className="category-title">{category}</h2>
      <div className="product-cards">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details">
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

export default FashionLayout;
