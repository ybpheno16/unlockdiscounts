import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './categoryslider.css';

const categories = ['Men', 'Women', 'Kid', 'Skincare', 'Footwear', 'Accessories', 'Beauty', 'Home', 'Gadgets'];

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
                        <div key={index} style={styles.slide}>
                            <div className='gradient-container'>
                                <img className='category-image' src={category.img} />
                            </div>
                            <p className='category-slider-text'>
                                {category}
                            </p>
                        </div>
                ))}
            </Slider>
        </div>
    );
};

const styles = {
    slide: {
        padding: '10px',
        textAlign: 'center'
    }
};

export default CategorySlider;