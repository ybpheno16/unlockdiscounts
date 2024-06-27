import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './productgallery.css'; // Ensure you have a corresponding CSS file

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('q');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/products?q=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFilteredProducts(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <h1>Search Results for "{query}"</h1>
      {filteredProducts.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="product-cards">
          {filteredProducts.map((product, index) => (
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
      )}
    </div>
  );
}

export default SearchResults;
