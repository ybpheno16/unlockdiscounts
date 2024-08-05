import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AutoSlideCarousel.css";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 3000,
        customPaging: () => <div className="custom-dot"></div>,
        appendDots: (dots) => (
            <div className="custom-dots">
                <ul> {dots} </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
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
            image: "image1.jpg",
            promo: "Up to 50% off",
        },
        {
            id: 2,
            image: "image2.jpg",
            promo: "Buy one get one free",
        },
        {
            id: 3,
            image: "image3.jpg",
            promo: "30% off new arrivals",
        },
        {
            id: 4,
            image: "image4.jpg",
            promo: "Exclusive deals",
        },
        {
            id: 5,
            image: "image5.jpg",
            promo: "Limited time offer",
        },
        {
            id: 6,
            image: "image6.jpg",
            promo: "Free shipping",
        },
        {
            id: 7,
            image: "image7.jpg",
            promo: "Up to 70% off",
        },
        {
            id: 8,
            image: "image8.jpg",
            promo: "Holiday specials",
        },
        {
            id: 9,
            image: "image9.jpg",
            promo: "New collection",
        },
        {
            id: 10,
            image: "image10.jpg",
            promo: "Flash sale",
        },
        {
            id: 11,
            image: "image11.jpg",
            promo: "Discounted prices",
        },
        {
            id: 12,
            image: "image12.jpg",
            promo: "Limited stock",
        },
    ];

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="carousel-slide">
                        <div className="carousel-brand">{slide.brand}</div>
                        <img
                            src={slide.image}
                            alt={slide.brand}
                            className="carousel-image"
                        />
                        <div className="carousel-promo">{slide.promo}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
