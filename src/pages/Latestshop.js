import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Latestshop.css";

const Latestshop = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      image: "/Latestshop/image 1.png",
      title: "Kid's Wear",
      description: "Description of first product",
    },
    {
      id: 2,
      image: "/Latestshop/image 2.png",
      title: "Women's Wear",
      description: "Description of second product",
    },
    {
      id: 3,
      image: "/Latestshop/image 3.png",
      title: "Men's Wear",
      description: "Description of third product",
    },
    {
      id: 4,
      image: "/Latestshop/image 4.png",
      title: "Electronic Gadgets",
      description: "Description of fourth product",
    },
    {
      id: 5,
      image: "/Latestshop/image 5.png",
      title: "Fitness",
      description: "Description of fifth product",
    },
    {
      id: 6,
      image: "/Latestshop/image 6.png",
      title: "Beauty Products",
      description: "Description of sixth product",
    },
    {
      id: 7,
      image: "/Latestshop/image 7.png",
      title: "Jewellery & Accessories",
      description: "Description of seventh product",
    },
    {
      id: 8,
      image: "/Latestshop/image 8.png",
      title: "Jewellery & Accessories",
      description: "Description of eighth product",
    },
    {
      id: 9,
      image: "/Latestshop/image 9.png",
      title: "Jewellery & Accessories",
      description: "Description of ninth product",
    },
  ];

  return (
    <div className="banner-wrapper">
      <h1 className="slider-heading">SHOP THE LATEST</h1>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide-2">
            <img src={slide.image} alt={slide.title} className="carousel-image-2" />
            <h4>{slide.title}</h4>
            <p>{slide.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Latestshop;
