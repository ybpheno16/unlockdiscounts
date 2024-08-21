import React from 'react';
import './AffiliateBrands.css';

const affiliateBrands = [
    // Add the URLs of the brand logos here
    './banners/amazon.png',
    './banners/myntra.webp',
    './banners/meesho.png',
    './banners/flipkart.png',
    './banners/ajio.jpg'
    // Add more as needed
];

const AffiliateBrands = () => {
    return (
        <div className="affiliate-brands-container">
            {affiliateBrands.map((logo, index) => (
                <div key={index} className="brand-logo-container">
                    <img src={logo} alt={`Brand ${index}`} className="brand-logo" />
                </div>
            ))}
        </div>
    );
};

export default AffiliateBrands;
