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

function Home() {
    return (
        <div>
            <CategorySlider />
            <Carousel />
            <NowOrNeverDeals />
            <Latestshop />
            <FestivalSale />
            <CrazyDeals />
            <AutoSliderCarousel />
            <GadgetsCarousel />
            <OnlineLearningComponent />
            <Banking />
        </div>
    );
}

export default Home;
