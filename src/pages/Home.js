import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './home.css';
import Carousel from '../components/Carousel'; // Import Carousel from components directory

function Home() {
  return (  
    <div>
        <Carousel />
        <div className="container">
            <h1 className="heading">Fashion</h1>
            <div className="category">
                <div className="category-item">
                    <Link to="/fashion/womens-wear">
                        <img src="/womenswearbanner.png" alt="Women's Wear" />
                        <div className="description">Women's Wear</div>
                    </Link>
                    <p>Explore the latest trends in women's fashion and find your perfect outfit.</p>
                </div>
                <div className="category-item">
                    <Link to="/fashion/mens-wear">
                        <img src="/menswearbanner.png" alt="Men's Wear" />
                        <div className="description">Men's Wear</div>
                    </Link>
                    <p>Discover stylish and comfortable clothing options for men.</p>
                </div>
                <div className="category-item">
                    <Link to="/fashion/kids-wear">
                        <img src="/kidswearbanner.png" alt="Kid's Wear" />
                        <div className="description">Kid's Wear</div>
                    </Link>
                    <p>Find the cutest and most trendy clothes for kids of all ages.</p>
                </div>
            </div>
        </div>
        <div className="container">
            <h1 className="heading">Electronics</h1>
            <div className="electronics-container">
            <div class="left-side">
                <div className="category">
                    <div className="e-category-item">
                        <Link to="/electronics/phones-accessories">
                            <img src="/mobileandacc.jpg" alt="Mobiles & Accessories" />
                            <div className="e-description">Mobiles & Accessories</div>
                        </Link>
                        <p>Explore our wide range of mobile phones and accessories</p> 
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="right-side-category">
                    <div className="e-category-item">
                        <Link to="/electronics/appliances">
                            <img src="/healthapp.jpg" alt="Health Appliances" />
                            <div className="e-description">Health Appliances</div>
                        </Link>
                        <p>Discover the best health appliances to maintain a healthy lifestyle</p>
                    </div>
                    <div className="e-category-item">
                        <Link to="/electronics/appliances">
                            <img src="/appliances.jpg" alt="Appliances" />
                            <div className="e-description">Appliances</div>
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
                    <Link to="/banking">
                        <img src="/cc.png" alt="Credit Card" />
                        <div className="description">Credit Cards</div>
                    </Link>
                    <p>Explore a wide range of credit cards tailored to suit your lifestyle and financial needs.</p>
                </div>
                <div className="category-item">
                    <Link to="/banking">
                        <img src="/ac.png" alt="Account Saving" />
                        <div className="description">Zero Savings Account</div>
                    </Link>
                    <p>Discover the benefits of a zero balance savings account with high interest rates and no minimum deposit requirements.</p>
                </div>
                <div className="category-item">
                    <Link to="/banking">
                        <img src="/nw.png" alt="Saving Application" />
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
