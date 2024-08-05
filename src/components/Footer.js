import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './footer.css'; // Import CSS file for the footer

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="company-info">
          <h2>UnlockDiscounts</h2>
          <ul>
            <li><Link to="https://www.facebook.com/profile.php?id=61560425212006" target='_blank' alt='Facebook Icon'><i className="fab fa-facebook"></i></Link></li>
            <li><Link to="https://www.instagram.com/unlock_discounts/" target='_blank' alt='Instagram Icon'><i className="fab fa-instagram"></i></Link></li>
          </ul>
        </div>
        <div className="footer-list">
          <h2>Online Learning</h2>
          <ul>
            <li><Link to="/distancelearning">Courses</Link></li>
            <li><Link to="/distancelearning">Colleges</Link></li>
          </ul>
        </div>
        <div className="footer-list">
          <h2>Fashion</h2>
          <ul>
            <li><Link to="/fashion/mens-wear">Men's Wear</Link></li>
            <li><Link to="/fashion/womens-wear">Women's Wear</Link></li>
            <li><Link to="/fashion/kids-wear">Kid's Wear</Link></li>
          </ul>
        </div>
        <div className="footer-list">
          <h2>Electronics</h2>
          <ul>
            <li><Link to="/electronics/phones-accessories">Mobile and Accessories</Link></li>
            <li><Link to="/electronics/appliances">Health Care</Link></li>
            <li><Link to="/electronics/appliances">Home Appliances</Link></li>
          </ul>
        </div>
        <div className="footer-list">
          <h2>Banking</h2>
          <ul>
            <li><Link to="/banking">Credit Cards</Link></li>
            <li><Link to="/banking">Zero Saving Account</Link></li>
            <li><Link to="/banking">Saving Applications</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
