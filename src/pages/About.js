// About.js
import React, { useContext } from "react";
import "./about.css"; // Import CSS file for the About page

function About() {
  return (
    <div className="container">
      <div className="about-container">
        <div className="about-left-side">
          <h1>About</h1>
          <h4>
            Unlock Discounts: Where Savings Meet Style & Smart Banking
            Solutions!
          </h4>
          <p>
            Welcome to Unlock Discounts - your go-to destination for incredible
            deals on a variety of products! We specialize in offering
            high-quality affiliate items at unbeatable prices, ensuring you save
            big with every purchase. From fashion essentials like women's,
            men's, and kids' wear to cutting-edge electronics including phones,
            accessories, home, and healthcare appliances, we've got everything
            you need to upgrade your lifestyle affordably.
          </p>
          <p>
            But that's not all - we're more than just a shopping hub. Unlock
            Discounts also provides essential banking services, offering the
            best credit cards, zero savings accounts, and top-saving
            applications to help you manage your finances efficiently.{" "}
          </p>
          <p>Join us today and unlock a world of discounts and convenience!</p>
        </div>
        <div className="about-right-side">
          <img src="/appliances/about.avif" alt="About Us" />
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-left-side">
          <h1>Contact Us</h1>
          <h4>Get in Touch: Let's Connect and Save Together!</h4>
          <p>
            Want to chat with us directly? Reach out to us on WhatsApp at
            +123-456-7890 and let's talk about all things savings and shopping!
            Whether you have questions about our products, need assistance with
            an order, or just want to say hello, we're here to help. Join our
            WhatsApp community and let's unlock amazing deals together!
          </p>
          <p>
            You can also connect with us on social media for the latest updates
            and exclusive offers. We're here to help you unlock savings and
            convenience, so don't hesitate to get in touch!{" "}
          </p>
        </div>
        <div className="contact-right-side">
          <img src="/logo/logo.jpg" alt="Contact Us" />
        </div>
      </div>
    </div>
  );
}

export default About;
