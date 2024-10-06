import React from 'react';
import './asia.css'; // Assuming your CSS is in the same folder
import bgImage from './bg.jpg'; // Assuming images are imported properly
import tajIcon from './taj.png'; // Assuming images are imported properly

function Asia() {
  return (
    <div className="App">
      {/* Container for horizontally scrolling content */}
      <div className="scroll-container" style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Add more images here if needed */}
      </div>

      {/* Icon that remains fixed on the screen */}
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
