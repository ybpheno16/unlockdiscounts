import React from "react";
import "./onlinelearningcomponent.css";
import { Link } from "react-router-dom";

// LearningCard component
const LearningCard = ({ img, title, description }) => {
  return (
    <div className="learning-card">
      <Link to="/banking" className="no-underline">
        <div className="card-image">
          <img loading="lazy" src={img} alt="online_learning" />
        </div>
        <div className="card-title">{title}</div>
      </Link>
      <p className="card-description">{description}</p>
    </div>
  );
};

// OnlineLearningComponent component
const OnlineLearningComponent = () => {
  // Data for learningCards
  const learningCardDetails = [
    {
      img: "./distancelearning/Amity.png",
      title: "Amity University",
      description: "Get 25% off on all courses",
    },
    {
      img: "./distancelearning/jain.jpg",
      title: "Jain University",
      description: "Get 20% off on all courses",
    },
    {
      img: "./distancelearning/Symbiosis.jpg",
      title: "Symbiosis University",
      description: "Get 30% off on all courses",
    },
  ];

  return (
    <div className="online-learning-component-container">
      <h1>
        ONLINE LEARNING{" "}
        <span className="right-arrow">
          <img src="/icons/right-arrow.svg" alt="" />
        </span>{" "}
      </h1>

      <div className="explore-button">EXPLORE MORE {">"}</div>

      <div className="cards">
        {learningCardDetails.map((card, index) => (
          <LearningCard
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

export default OnlineLearningComponent;
