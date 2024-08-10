import React from 'react';
import { Link } from 'react-router-dom';
import './banking.css';

export default function Banking() {
    return (
        <>

            <div className='main'>

                <div className='banking container'>
                    <h1>BANKING</h1>
                    <div className='cards'>
                      
                      <div className='card'>
                      <Link to="/banking" className='no-underline'>
                            <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340426/cc_xm0l2a.avif" alt="Credit Card Image" />
                            <div className="description"><h2>Credit Cards</h2></div>
                        </Link>
                        <p className='banking-desc'>Explore a wide range of credit cards tailored to suit your lifestyle and financial needs.</p>
                      </div>
                      <div className='card'>
                      <Link to="/banking" className='no-underline'>
                            <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340425/ac_j5mhby.avif" alt="Credit Card Image" />
                            <div className="description"><h2>Savings Account</h2></div>
                        </Link>
                        <p className='banking-desc'>Discover the benefits of a zero balance savings account with high interest rates and no minimum deposit requirements.</p>
                      </div>
                      <div className='card'>
                      <Link to="/banking" className='no-underline'>
                            <img loading="lazy" src="https://res.cloudinary.com/dcmtxvsav/image/upload/v1722340428/nw_y3nve3.avif" alt="Credit Card Image" />
                            <div className="description"><h2>Savings Application</h2></div>
                        </Link>
                        <p className='banking-desc'>Find the perfect saving application to help you manage your finances, save money effortlessly, and achieve your financial goals.</p>
                      </div>

                    </div>


                </div>

            </div>

        </>
    )
}
