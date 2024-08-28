import React, { useEffect, useState } from 'react';
import './ReviewSection.css';

function ReviewSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviewsPerPage = 3;

    const reviews = [
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "Alex K.",
            text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
        },
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "Emma L.",
            text: "Shop.co has revolutionized my shopping experience. The quality and variety of clothing are unmatched. Highly recommended!"
        },
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "John D.",
            text: "The user-friendly interface and diverse collection at Shop.co make it my go-to destination for fashion. Excellent service!"
        },
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "Linda M.",
            text: "I love the curated selections on Shop.co. It's easy to find trendy and high-quality clothes without any hassle."
        },
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "Michael T.",
            text: "The shopping experience at Shop.co is exceptional. Great clothes, easy navigation, and prompt customer service."
        },
        {
            stars: "⭐⭐⭐⭐⭐",
            name: "Sarah W.",
            text: "Shop.co has a fantastic collection of clothes that cater to all styles. The site is easy to use, and the delivery is fast."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + reviewsPerPage) % reviews.length);
        }, 2000); // Interval of 2 seconds

        return () => clearInterval(interval);
    }, []);

    const visibleReviews = [
        ...reviews.slice(currentIndex, currentIndex + reviewsPerPage),
        ...reviews.slice(0, Math.max(0, (currentIndex + reviewsPerPage) - reviews.length))
    ];

    return (
        <div className="review-section">
            <div className="review-header">
                <h2 className="review-title">OUR HAPPY CUSTOMERS</h2>
            </div>
            <div className="review-container">
                {visibleReviews.map((review, index) => (
                    <div className="review-item" key={index}>
                        <p className="stars">{review.stars}</p>
                        <h3>{review.name}</h3>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewSection;