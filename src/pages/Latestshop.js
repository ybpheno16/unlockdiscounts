import React, { useContext } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Latestshop.css";
import { ProductContext } from "../contexts/ProductContext";

const Latestshop = () => {
  const { state, handleLoadMore, hasMore, dispatch } =
    useContext(ProductContext);
  const settings = {
    dots: false,
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
      image: "/Latestshop/image 1.png",
      description: "Kid's Wear",
      promo: "Description of first product",
      link: "/fashion/kids-wear/latest?page=1", // Define the link for the specific page
      query: "mainCategory=kidswear", // Define the query for the specific page
    },
    {
      id: 2,
      image: "/Latestshop/image 2.png",
      description: "Women's Wear",
      promo: "Description of second product",
      link: "/fashion/womens-wear/latest?page=1",
      query: "mainCategory=womenswear",
    },
    {
      id: 3,
      image: "/Latestshop/image 3.png",
      description: "Men's Wear",
      promo: "Description of third product",
      link: "/fashion/mens-wear/latest?page=1",
      query: "mainCategory=menswear",
    },
    {
      id: 4,
      image: "/Latestshop/image 4.png",
      description: "Electronic Gadgets",
      promo: "Description of fourth product",
      link: "/electronics/latest?page=1",
      query: "category=Electronics",
    },

    //page not found
    {
      id: 5,
      image: "/Latestshop/image 5.png",
      description: "Fitness",
      promo: "Description of fifth product",
      link: "/fitness/latest?page=1",
      query: "category=Fitness",
    },

    {
      id: 6,
      image: "/Latestshop/image 6.png",
      description: "Beauty Products",
      promo: "Description of sixth product",
      link: "/beauty/latest?page=1",
      query: "mainCategory=beauty",
    },


    // both of them are same
    //page not found
    {
      id: 7,
      image: "/Latestshop/image 7.png",
      description: "Jewellery & Accessories",
      promo: "Description of seventh product",
      link: "/jewellery/latest?page=1",
      query: "category=Jewellery",
    },

    //page not found
    // {
    //   id: 8,
    //   image: "/Latestshop/image 8.png",
    //   description: "Jewellery & Accessories",
    //   promo: "Description of eighth product",
    //   link: "/jewellery",
    //   query:"category=Jewellery",
    // },
    {
      id: 8,
      image: "/Latestshop/image 9.png",
      description: "Kitchen Utilities",
      promo: "Description of ninth product",
      link: "/electronics?page=1",
      query: "category=Kitchen %26 Table",
    },
  ];

  const handleFetchProducts = async (query) => {
    try {
      // const url = `http://localhost:8080/api/banner/latest?${query}`;
      // // encoding the query string
      // console.log("Encoded Query:", url);

      const response = await fetch(
        `http://localhost:8080/api/banner/latest?${query}`
      );
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        dispatch({ type: "SET_PRODUCTS", payload: data?.products });
        console.log(state);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="latest-carousel-container">
      <h2 className="latest-carousel-heading">SHOP THE LATEST</h2>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="latest-carousel-slide"
            onClick={() => {
              handleFetchProducts(slide.query);
            }}
          >
            {/* Wrap each slide with Link */}
            <Link to={slide.link}>
              <img
                src={slide.image}
                alt={slide.description}
                className="latest-carousel-image"
              />
              <div className="latest-carousel-description">
                {slide.description}
              </div>
              <div className="latest-carousel-promo">{slide.promo}</div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Latestshop;
