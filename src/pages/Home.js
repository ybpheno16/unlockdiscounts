import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Carousel from '../components/Carousel';
import Banking from '../components/Banking';
import OnlineLearningComponent from '../components/OnlineLearningComponent';
import AutoSliderCarousel from './AutoSlideCarousel';
import GadgetsCarousel from './GadgetsCarousel';

function Home() {
    return (
        <div>
            <Carousel />
            <AutoSliderCarousel />
            <GadgetsCarousel />
            <OnlineLearningComponent />
            <Banking />
        </div>
    );
}

export default Home;
