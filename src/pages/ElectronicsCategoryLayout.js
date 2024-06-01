import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './electronics.css';

function ElectronicsCategoryLayout({ category, bannerImage }) {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  // Ensure that products is defined and is an array before filtering
  const filteredProducts = Array.isArray(products)
    ? products.filter(product => product.category === category)
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="electronicss-container">
      <h1 className="electronicss-title">Electronics</h1>
      <p className="electronincss-subdes">Unlock Innovation: Explore Cutting-Edge Electronics at Unbeatable Prices!</p>
      <div className="banner">
        <img src={bannerImage} alt={`${category} Banner`} className="electronincss-banner-image" />
      </div>
      <h2 className="category-title">{category}</h2>
      <div className="electronic-product-cards">
        {filteredProducts.map((product, index) => (
          <div key={index} className="electronic-product-card">
            <div className="electronic-product-details">
              <div className="electronic-product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className="electronic-product-title">{product.title}</h3>
              <p className="electronic-product-description">{product.description}</p>
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElectronicsCategoryLayout;
