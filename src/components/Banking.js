import React from 'react';
import { Link } from 'react-router-dom';
import './banking.css';

// BankingCard Component
const BankingCard = ({ img, title, description }) => {
  return (
    <div className="banking-card">
      <Link to="/banking" className="no-underline">
        <div className="card-image">
          <img loading="lazy" src={img} alt={title} />
        </div>
        <div className="card-title">
          <h2>{title}</h2>
        </div>
      </Link>
      <p className="card-description">{description}</p>
    </div>
  );
};

// Banking Component
const Banking = () => {
  // Data for banking cards
  const bankingCardDetails = [
    {
      img: 'https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340426/cc_xm0l2a.avif',
      title: 'Credit Cards',
      description: 'Explore a wide range of credit cards tailored to suit your lifestyle and financial needs.',
    },
    {
      img: 'https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340425/ac_j5mhby.avif',
      title: 'Savings Account',
      description: 'Discover the benefits of a zero balance savings account with high interest rates and no minimum deposit requirements.',
    },
    {
      img: 'https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340428/nw_y3nve3.avif',
      title: 'Savings Application',
      description: 'Find the perfect saving application to help you manage your finances, save money effortlessly, and achieve your financial goals.',
    },
  ];

  return (
    <div className="banking-component-container">
      <h1>
        BANKING
      </h1>

      <div className="cards">
        {bankingCardDetails.map((card, index) => (
          <BankingCard
            key={index}
            img={card.img}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Banking;
