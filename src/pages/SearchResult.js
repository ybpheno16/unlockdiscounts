import React from 'react';
import { useLocation } from 'react-router-dom';
import './productgallery.css';

const SearchResult = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="container">
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <div className="product-cards">
          {results.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
