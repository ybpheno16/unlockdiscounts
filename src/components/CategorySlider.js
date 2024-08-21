import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './categoryslider.css';

// Dummy image source; replace with actual image URLs
const categories = [
  { name: 'Men', img: './CategorySlider/mens.png' },
  { name: 'Women', img: './CategorySlider/womens.png' },
  { name: 'Kid', img: './CategorySlider/kids.png' },
  { name: 'Skincare', img: './CategorySlider/skincare.jpg' },
  { name: 'Footwear', img: './CategorySlider/footwear.png' },
  { name: 'Accessories', img: './CategorySlider/jewellery.jpg' },
  { name: 'Beauty', img: './CategorySlider/makeup.jpg' },
  { name: 'Home', img: './CategorySlider/homedecor.png' },
  { name: 'Gadgets', img: './CategorySlider/gadgets.jpg' }
];

const CategorySlider = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.5, // Number of categories visible at a time
        slidesToScroll: 1,
    };

    return (
        <div className='slider-container'>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className='slide'>
                        <div className='gradient-container'>
                            <img className='category-image' src={category.img} alt={category.name} />
                        </div>
                        <p className='category-slider-text'>
                            {category.name}
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategorySlider;
