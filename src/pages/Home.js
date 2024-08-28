import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Carousel from '../components/Carousel';
import Banking from '../components/Banking';
import OnlineLearningComponent from '../components/OnlineLearningComponent';
import AutoSliderCarousel from './AutoSlideCarousel';
import GadgetsCarousel from './GadgetsCarousel';
import Latestshop from './Latestshop';
import NowOrNeverDeals from '../components/noworneverdeals';
import FestivalSale from '../components/FestivalSale';
import CrazyDeals from '../components/CrazyDeals';
import CategorySlider from '../components/CategorySlider';
import AffiliateBrands from '../components/AffiliateBrands';
import Customerreviewsection from '../components/ReviewSection'

function Home() {
    return (
        <div>
            <CategorySlider />
            <Carousel />
            <NowOrNeverDeals />
            <Latestshop />
            <FestivalSale />
            <AffiliateBrands />
            <CrazyDeals />
            <AutoSliderCarousel />
            <GadgetsCarousel />
            <OnlineLearningComponent />
            <Banking />
            <Customerreviewsection />
        </div>
    );
}

export default Home;
