// FashionLayout.js
import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './fashion.css';

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
    <div className="fashion-container">
      <h1 className="fashion-title">Fashion</h1>
      <p className="fashion-subdes">Unlock Style: Elevate Your Wardrobe with Trendy Fashion Finds!</p>
      <div className="banner">
        <img src={bannerImage} alt={`${category} Banner`} className="fashion-banner-image" />
      </div>
      <h2 className="category-title">{category}</h2>
      <div className="fashion-product-cards">
        {filteredProducts.map((product, index) => (
          <div key={index} className="fashion-product-card">
            <div className="fashion-product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="fashion-product-details">
              <h3 className="fashion-product-title">{product.title}</h3>
              <p className="fashion-product-description">{product.description}</p>
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FashionLayout;
