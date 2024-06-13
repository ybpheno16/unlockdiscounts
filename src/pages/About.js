// About.js
import React, { useContext } from 'react';
import './about.css'; // Import CSS file for the About page

function About() {
  return (
    <div className="about-container">
      <div className="about-left-side">
        <h1>About</h1>
        <h4>Unlock Discounts: Where Savings Meet Style & Smart Banking Solutions!</h4>
        <p>Welcome to Unlock Discounts - your go-to destination for incredible deals on a variety of products! We specialize in offering high-quality affiliate items at unbeatable prices, ensuring you save big with every purchase. From fashion essentials like women's, men's, and kids' wear to cutting-edge electronics including phones, accessories, home, and healthcare appliances, we've got everything you need to upgrade your lifestyle affordably.</p>
        <p>But that's not all - we're more than just a shopping hub. Unlock Discounts also provides essential banking services, offering the best credit cards, zero savings accounts, and top-saving applications to help you manage your finances efficiently. </p>
        <p>Join us today and unlock a world of discounts and convenience!</p>
      </div>
      <div className="about-right-side">
        <img src="/about.png" alt="About Us" />
      </div>
    </div>
  );
}

export default About;
