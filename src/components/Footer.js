import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./footer.css"; // Import CSS file for the footer

// Create a functional component for BlackBanner
const BlackBanner = () => {
  return (
    <div className="black-banner">
      <div className="left">STAY UPTO DATE ABOUT OUR LATEST OFFERS</div>
      <div className="right">
        <span>
          <img src="/icons/email.svg" alt="" width={30} />
          <input type="text" placeholder="Enter your email Address......" />
        </span>
        <button>Get The Latest deals.</button>
      </div>
    </div>
  );
};

// Create a functional component for WhiteBanner
const WhiteBanner = () => {
  return (
    <div className="container">
      <div className="white-banner">

        {/* below div is created for left most section that has few social media links */}
        <div className="left">
          <p className="branding">UNLOCKDISCOUNTS</p>
          <p className="summary">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="contact-icons">
            <img src="/icons/twitter.svg" alt="" width={20}/>
            <img src="/icons/facebook.svg" alt="" width={20}/>
            <img src="/icons/instagram.svg" alt="" width={20}/>
          </div>
        </div>

        {/*  below div is created to display he right section that has the direct links to various pages  */}
        <div className="right">

          {/*  below div is created to display the column with pages link of ONLINE LEARNING */}
          <div className="col">
            <h2 className="sub-heading">ONLINE LEARNING</h2>
            <nav>
              <li>
                <Link className="link" to="/distancelearning">Courses</Link>
              </li>
              <li>
                <Link className="link" to="/distancelearning">Colleges</Link>
              </li>
            </nav>
          </div>

          {/*  below div is created to display the column with pages link of FASHION */}
          <div className="col">
              <h2 className="sub-heading">Fashion</h2>
              <nav>
                <li>
                  <Link className="link" to="/fashion/mens-wear">Men's Wear</Link>
                </li>
                <li>
                  <Link className="link" to="/fashion/womens-wear">Women's Wear</Link>
                </li>
                <li>
                  <Link className="link" to="/fashion/kids-wear">Kid's Wear</Link>
                </li>
              </nav>
            
          </div>

          {/*  below div is created to display the column with pages link of ELECTRONICS */}
          <div className="col">
            <h2 className="sub-heading">Electronics</h2>
            <nav>
              <li>
                <Link className="link" to="/electronics/phones-accessories">
                  Mobile and Accessories
                </Link>
              </li>
              <li>
                <Link className="link" to="/electronics/appliances">Health Care</Link>
              </li>
              <li>
                <Link className="link" to="/electronics/appliances">Home Appliances</Link>
              </li>
            </nav>
          </div>

          {/*  below div is created to display the column with pages link of BANKING */}
          <div className="col">
            <h2 className="sub-heading">Banking</h2>
            <nav>
              <li>
                <Link className="link" to="/banking">Credit Cards</Link>
              </li>
              <li>
                <Link className="link" to="/banking">Zero Saving Account</Link>
              </li>
              <li>
                <Link className="link" to="/banking">Saving Applications</Link>
              </li>
            </nav>
          </div>


        </div>
      </div>
    </div>
  );
};
function Footer() {
  return (
    <footer className="footer">
      <BlackBanner />
      <WhiteBanner />
    </footer>
  );
}

export default Footer;
