import React, { useState, useEffect } from 'react';
import './nowornever.css'; // Import the CSS file

const NowOrNeverDeals = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-12-31T23:59:59'); // Set your target date here
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="nn-deals">
      <div className="nn-header">
        <div className="now-or-never">NOW OR NEVER</div>
        <div className="deals">DEALS</div>
      </div>
      <div className="countdown">
        <p>DEALS ENDS IN :</p>
        <div className="timer">
          <div className="time-segment">
            <div className="time-box">{String(timeLeft.hours).padStart(2, '0')} h</div>
            <span className="colon">:</span>
          </div>
          <div className="time-segment">
            <div className="time-box">{String(timeLeft.minutes).padStart(2, '0')}m</div>
            <span className="colon">:</span>
          </div>
          <div className="time-segment">
            <div className="time-box">{String(timeLeft.seconds).padStart(2, '0')}s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowOrNeverDeals;
