import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Carousel from '../components/Carousel';
import Banking from '../components/Banking';
import OnlineLearningComponent from '../components/OnlineLearningComponent';

function Home() {
    return (
        <div>
            <Carousel />
            <div className="container">
                <h1 className="heading">Fashion</h1>
                <div className="category">
                    <div className="category-item">
                        <Link to="/fashion/womens-wear" className='no-underline'>
                            <img loading='lazy' src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328189/womenswearbanner_c1itx2.png" alt="Banner showing Women's Wear Collection" />
                            <div className="description"><p>Women's Wear</p></div>
                        </Link>
                        <p>Explore the latest trends in women's fashion and find your perfect outfit.</p>
                    </div>
                    <div className="category-item">
                        <Link to="/fashion/mens-wear" className='no-underline'>
                            <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328189/menswearbanner_huw4ed.png" alt="Banner showing Men's Wear Collection" />
                            <div className="description"><p>Men's Wear</p></div>
                        </Link>
                        <p>Discover stylish and comfortable clothing options for men.</p>
                    </div>
                    <div className="category-item">
                        <Link to="/fashion/kids-wear" className='no-underline'>
                            <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722328189/kidswearbanner_ppnoaq.png" alt="Banner showing Kids's Wear Collection" />
                            <div className="description"><p>Kid's Wear</p></div>
                        </Link>
                        <p>Find the cutest and most trendy clothes for kids of all ages.</p>
                    </div>
                </div>
            </div>
            <OnlineLearningComponent />
            <Banking />
        </div>
    );
}

export default Home;
