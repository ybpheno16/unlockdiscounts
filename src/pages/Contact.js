// About.js
import React from 'react';
import './contact.css'; // Import CSS file for the About page

function About() {
  return (
    <div className="contact-container">
      <div className="contact-left-side">
        <h1>Contact Us</h1>
        <h4>Get in Touch: Let's Connect and Save Together!</h4>
        <p>Want to chat with us directly? Reach out to us on WhatsApp at +123-456-7890 and let's talk about all things savings and shopping! Whether you have questions about our products, need assistance with an order, or just want to say hello, we're here to help. Join our WhatsApp community and let's unlock amazing deals together!</p>
        <p>You can also connect with us on social media for the latest updates and exclusive offers. We're here to help you unlock savings and convenience, so don't hesitate to get in touch! </p>
      </div>
      <div className="contact-right-side">
        <img src="/logo/logo.jpg" alt="Contact Us" />
      </div>
    </div>
  );
}

export default About;
