import React, { useState, useEffect, useRef } from 'react';
import './header.css'; // Import CSS file for the header
import { Link, useNavigate } from 'react-router-dom'; // Import Link component from react-router-dom
import axios from 'axios';
import Fuse from 'fuse.js'; // Import fuse.js for fuzzy search

function Header() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const searchContainerRef = useRef(null); // Create a ref for the search container


  const navigate = useNavigate(); // Initialize useNavigate

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://products2-tt3o.onrender.com/api/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (value) => {
    setQuery(value);
    setShowSuggestions(true);

    const fuse = new Fuse(products, {
      keys: ['title', 'description'],
      includeScore: true,
      threshold: 0.4, // Adjust threshold as needed
    });

    const results = fuse.search(value);
    const matches = results.map(result => result.item);
    setFilteredProducts(matches);

    if (value === '') {
      setFilteredProducts([]);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setShowSuggestions(false);

    const fuse = new Fuse(products, {
      keys: ['title', 'description'],
      includeScore: true,
      threshold: 0.4, // Adjust threshold as needed
    });

    const results = fuse.search(query);
    const matches = results.map(result => result.item);
    setFilteredProducts(matches);

    if (query === '') {
      setFilteredProducts([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setShowSuggestions(false);

    const fuse = new Fuse(products, {
      keys: ['title', 'description'],
      includeScore: true,
      threshold: 0.4, // Adjust threshold as needed
    });

    const results = fuse.search(value);
    const matches = results.map(result => result.item);
    setFilteredProducts(matches);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  // Determine screen width
  const screenWidth = window.innerWidth;

  const SearchResult = ({ result }) => {
    return (
      <div
        className="search-result"
        onClick={() => handleSuggestionClick(result.title)}
      >
        {result.title}
      </div>
    );
  };

  const SearchResultsList = ({ results }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result} key={id} />;
        })}
      </div>
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setShowSuggestions(false); // Only hide suggestions
            setFilteredProducts([]); // Clear product results
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [searchContainerRef]);



  return (
    <>
      <header className="header">
        {screenWidth > 768 ? (
          // Desktop view
          <div className="top-bar">
            <div className="unlockdiscounts"><Link to="/">UnlockDiscounts</Link></div>
            <div className="search-bar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="searchInput"
                  placeholder="Looking for something..."
                  value={query}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyPress={handleKeyPress} // Handle Enter key press
                  autoComplete="off"
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/distancelearning">Distance Learning</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        ) : (
          // Mobile view
          <div className="top-bar">
            <div className="mobile-row-1">
              <div className="unlockdiscounts">UnlockDiscounts</div>
              <div className="search-bar">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    name="searchInput"
                    placeholder="Looking for something..."
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyPress={handleKeyPress} // Handle Enter key press
                    autoComplete="off"
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
            <div className="mobile-row-2">
              <nav className="nav-links">
                <Link to="/"><i className="fas fa-home"></i></Link>
                <Link to="/blog"><i className="fas fa-blog"></i></Link>
                <Link to="/distancelearning"><i className="fas fa-graduation-cap"></i></Link>
                <Link to="/about"><i className="fas fa-info-circle"></i></Link>
                <Link to="/contact"><i className="fas fa-envelope"></i></Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {error && <p>{error}</p>}
        {showSuggestions && query.length > 0 && filteredProducts.length > 0 && (
          <div className='search-container' ref={searchContainerRef}>
              <SearchResultsList results={filteredProducts} />
          </div>
        )}

      {query.length > 1 && filteredProducts.length > 0 && !showSuggestions && (
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
      )}

      <footer className="footer">
        {/* Footer content */}
      </footer>
    </>
  );
}

export default Header;








