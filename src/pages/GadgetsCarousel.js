import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AutoSlideCarousel";

const Carousel = () => {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      image: "./gadgetscarousel/image1.jpg",
      description: "Catchy description 1",
      promo: "Up to 50% off",
    },
    {
      id: 2,
      image: "./gadgetscarousel/image2.jpg",
      description: "Catchy description 2",
      promo: "Buy one get one free",
    },
    {
      id: 3,
      image: "./gadgetscarousel/image3.jpg",
      description: "Catchy description 3",
      promo: "30% off new arrivals",
    },
    {
      id: 4,
      image: "./gadgetscarousel/image4.jpg",
      description: "Catchy description 4",
      promo: "Exclusive deals",
    },
    {
      id: 5,
      image: "./gadgetscarousel/image5.jpg",
      description: "Catchy description 5",
      promo: "Limited time offer",
    },
    {
      id: 6,
      image: "./gadgetscarousel/image6.jpg",
      description: "Catchy description 6",
      promo: "Free shipping",
    },
    {
      id: 7,
      image: "./gadgetscarousel/image7.jpg",
      description: "Catchy description 7",
      promo: "Up to 70% off",
    },
    {
      id: 8,
      image: "./gadgetscarousel/image8.jpg",
      description: "Catchy description 8",
      promo: "Holiday specials",
    },
    {
      id: 9,
      image: "./gadgetscarousel/image9.jpg",
      description: "Catchy description 9",
      promo: "New collection",
    },
    {
      id: 10,
      image: "./gadgetscarousel/image10.jpg",
      description: "Catchy description 10",
      promo: "Flash sale",
    },
    {
      id: 11,
      image: "./gadgetscarousel/image11.jpg",
      description: "Catchy description 11",
      promo: "Discounted prices",
    },
    {
      id: 12,
      image: "./gadgetscarousel/image12.jpg",
      description: "Catchy description 12",
      promo: "Limited stock",
    },
  ];

  const handleFetchProducts = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/banner/bestselling-gadgets`
      );
      const data = await response.json();
      if (data.success === true) {
        // dispatch({ type: "SET_PRODUCTS", payload: data?.products });
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        console.log(data);
      }

      /*
    {
    "_id": "66e2ce1eff34f7c10ad94c05",
    "title": "HERE&NOW",
    "description": "Men Smart Relaxed Fit Pure Cotton Cargo Jeans",
    "image": "https://drive.google.com/thumbnail?id=1tKKdpBrn4WaBO4329ZmN3WbEfiQH6dCg",
    "affiliateLink": "https://myntr.it/uITCcD8",
    "category": "Bottomwear",
    "sub_category": "Jeans"
}
     */

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);
  return (
    <div className="carousel-container">
      <h2 className="carousel-heading">BEST SELLING GADGETS</h2>
      <Slider {...settings}>
        {products.length > 0 &&
          products?.map((product) => (
            <div key={product._id} className="carousel-slide">
              {" "}
              <img
                src={product.image}
                alt={product.title}
                className="carousel-image"
              />
              <div className="carousel-description">{product.title}</div>
              <div className="carousel-promo">{product.description}</div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
