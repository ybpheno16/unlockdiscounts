import React from "react";
import "./onlinelearningcomponent.css";
import { Link } from "react-router-dom";

const LearningCard = ({ img, title, description }) => {
  return (
    <div className="learning-card">
      {/* <img loading="lazy" src={img} alt="Learning Card" />
      <p className="card-title">{title}</p>
      <p className="card-description">{description}</p> */}
      <Link to="/banking" className="no-underline">
        <img loading="lazy" src={img} alt="Credit Card Image" />
        <div className="card-title">{title}</div>
      </Link>
      <p className="card-description">{description}</p>
    </div>
  );
};
const OnlineLearningComponent = () => {
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
