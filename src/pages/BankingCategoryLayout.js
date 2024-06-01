import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './banking.css';

function BankingCategoryLayout({ categories }) {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="banking-container">
      <h1 className="banking-title">Banking Page</h1>
      <p className="subdesc">Unlock Financial Freedom: Discover Smart Banking Solutions with Us!</p>
      <div className="common-banner">
        <img src="/bankingbanner.png" alt="Common Banner" className="common-banner-image" />
      </div>
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.title}</h2>
          <div className="product-cards">
            {products.filter(product => product.category === category.title).map((product, index) => (
              <div key={index} className="banking-product-card">
                <div className="banking-product-details">
                  <div className="banking-product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h3 className="banking-product-title">{product.title}</h3>
                  <p className="banking-product-description">{product.description}</p>
                  <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BankingCategoryLayout;
