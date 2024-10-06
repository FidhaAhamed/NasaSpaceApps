import React from 'react';
import './asia.css';
import bgImage from '/bg.jpg'; 
import tajIcon from '/taj.png';

function Asia() {
  return (
    <div className="App">
      <div className="scroll-container" style={{ backgroundImage: `url(${bgImage})` }}>
      </div>

      <div className="fixed-icon">
        <img src={tajIcon} alt="Icon" />
      </div>

      <div className="weather-icons">
        {/* Thermometer Icon */}
        <div className="icon-container">
          <i className="fas fa-thermometer-half"></i>
          <span>Temperature</span>
        </div>

        {/* Humidity Icon */}
        <div className="icon-container">
          <i className="fas fa-tint"></i>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
}

export default Asia;
