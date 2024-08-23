import React from 'react';
import './FestivalSale.css';

// Replace `images` with `festiveImg` array
const festiveImg = [
  { src: '/banners/independenceday.png', link: 'https://www.independenceday.com' },
  { src: '/banners/rakshabandhan.png', link: 'https://www.rakshabandhan.com' },
  { src: '/banners/friendshipday.png', link: 'https://www.friendshipday.com' },
];

const FestivalSale = () => {
  return (
    <div className="festival-sale-wrapper">
      <div className="festival-sale-header">
        <div className="festival-sale-text">FESTIVAL SALE IS LIVE NOW</div>
      </div>
      <div className="festival-sale-container">
        <div className="festival-sale-container-slider">
          <div className="festival-sale-slide-container">
            {festiveImg.map((festive, index) => (
              <a
                key={index}
                href={festive.link}
                target="_blank"
                rel="noopener noreferrer"
                className="festival-sale-slide"
              >
                <img
                  className="festival-sale-image"
                  src={festive.src}
                  alt={`Festive Image ${index + 1}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalSale;
