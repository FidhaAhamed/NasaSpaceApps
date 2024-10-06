import React from 'react';
import './asia.css';
import bgImage from '/bg2.jpg'; 
import tajIcon from '/opera house.png';

function Asia() {
  return (
    <div className="App">
      {/* Background Image */}
      <div className="background"></div>

      <div className="scroll-container">
        <div className="content-block" style={{ backgroundImage: `url(${bgImage})` }}>
       </div>
       
      </div>

      <div className="fixed-icon">
        <img src={tajIcon} alt=" Icon" />
      </div>

      <div className="weather-icons">
        {/* Thermometer Icon */}
        <div className="icon-container">
          <span>Temperature</span>
        </div>

        {/* Humidity Icon */}
        <div className="icon-container">
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
}

export default Asia;
