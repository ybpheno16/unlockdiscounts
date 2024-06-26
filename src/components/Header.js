import React, { useState } from 'react';
import './header.css'; // Import CSS file for the header
import { Link, useNavigate } from 'react-router-dom'; // Import Link component from react-router-dom

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission
    const query = event.target.elements.searchInput.value;
    navigate(`/search?q=${query}`); // Navigate to search page with query
  };

  // Determine screen width
  const screenWidth = window.innerWidth;

  return (
    <header className="header">
      {screenWidth > 768 ? (
        // Desktop view
        <div className="top-bar">
          <div className="unlockdiscounts"><Link to="/">UnlockDiscounts</Link></div>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input type="text" name="searchInput" placeholder="Looking for something..." />
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
                  <input type="text" name="searchInput" placeholder="Looking for something..." />
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
  );
}

export default Header;
