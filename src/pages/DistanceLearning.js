// DistanceLearning.js
import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './distancelearning.css'; // Import CSS file for the Distance Learning page

function DistanceLearning() {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  // Filter products by category "distance learning"
  const distanceLearningCourses = products.filter(product => product.category === 'distance learning');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dls-container">
      <h1 className="dls-title">Distance Learning</h1>
      <p className="dls-description">
        Discover our distance learning courses and enhance your knowledge from anywhere.
      </p>
      {Array.isArray(distanceLearningCourses) && distanceLearningCourses.map((course, index) => (
        <div key={index} className={`dl-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
          {/* Course details go here */}
          <div className="dl-details">
            <h2 className="dl-title">{course.title}</h2>
            <p className="dl-text">{course.description}</p>
          </div>
          {/* Course image goes here */}
          {course.image && (
            <div className="dl-image">
              <img src={course.image} alt={course.title} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DistanceLearning;
