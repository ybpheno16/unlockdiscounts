import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Carousel from '../components/Carousel';

function Home() {
  return (  
    <div>
      <Carousel />
      <div className="container">
        <h1 className="heading">Fashion</h1>
        <div className="category">
          <div className="category-item">
            <Link to="/fashion/womens-wear">
              <img src="/fashion/womenswearbanner.avif" alt="Women's Wear" />
              <div className="description">Women's Wear</div>
            </Link>
            <p>Explore the latest trends in women's fashion and find your perfect outfit.</p>
          </div>
          <div className="category-item">
            <Link to="/fashion/mens-wear">
              <img src="/fashion/menswearbanner.avif" alt="Men's Wear" />
              <div className="description">Men's Wear</div>
            </Link>
            <p>Discover stylish and comfortable clothing options for men.</p>
          </div>
          <div className="category-item">
            <Link to="/fashion/kids-wear">
              <img src="/fashion/kidswearbanner.avif" alt="Kid's Wear" />
              <div className="description">Kid's Wear</div>
            </Link>
            <p>Find the cutest and most trendy clothes for kids of all ages.</p>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="heading">Electronics</h1>
        <div className="electronics-container">
          <div className="left-side">
            <div className="category">
              <div className="e-category-item">
                <Link to="/electronics/phones-accessories" className='no-underline'>
                  <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722336914/mobileandacc_xzxoli.avif" alt="Mobiles & Accessories Image" />
                  <div className="e-description"><h2>Mobiles & Accessories</h2></div>
                </Link>
                <p>Explore our wide range of mobile phones and accessories</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-side-category">
              <div className="e-category-item">
                <Link to="/electronics/appliances" className='no-underline'>
                  <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722336911/healthapp_xpl4xq.avif" alt="Health Care Appliances" />
                  <div className="e-description"><h2>Health Appliances</h2></div>
                </Link>
                <p>Discover the best health appliances to maintain a healthy lifestyle</p>
              </div>
              <div className="e-category-item">
                <Link to="/electronics/appliances" className='no-underline'>
                  <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722336910/appliances_drxnxy.avif" alt="Home Appliances" />
                  <div className="e-description"><h2>Appliances</h2></div>
                </Link>
                <p>Find top-quality home appliances for your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="heading">Banking</h1>
        <div className="category">
          <div className="category-item">
            <Link to="/banking" className='no-underline'>
              <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340426/cc_xm0l2a.avif" alt="Credit Card Image" />
              <div className="description">Credit Cards</div>
            </Link>
            <p>Explore a wide range of credit cards tailored to suit your lifestyle and financial needs.</p>
          </div>
          <div className="category-item">
            <Link to="/banking" className='no-underline'>
              <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340425/ac_j5mhby.avif" alt="Account Saving" />
              <div className="description">Zero Savings Account</div>
            </Link>
            <p>Discover the benefits of a zero balance savings account with high interest rates and no minimum deposit requirements.</p>
          </div>
          <div className="category-item">
            <Link to="/banking" className='no-underline'>
              <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340428/nw_y3nve3.avif" alt="Saving Application Image" />
              <div className="description">Saving Applications</div>
            </Link>
            <p>Find the perfect saving application to help you manage your finances, save money effortlessly, and achieve your financial goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
