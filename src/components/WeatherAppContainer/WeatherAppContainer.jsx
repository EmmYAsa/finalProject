import React, { useState } from 'react';
import WeatherForecast from '../WeatherApp/WeatherApp';
import Weather10Days from '../Weather10Days'; 
import CitySelector from '../CitySelector';
import './WeatherAppContainer.css';

function WeatherAppContainer() {
    const [selectedComponent, setSelectedComponent] = useState('current');
    const [city, setCity] = useState('Raleigh');
  
    const handleButtonClick = (component) => {
      setSelectedComponent(component);
    };
  
    const handleCityChange = (selectedCity) => {
      setCity(selectedCity);
    };
  
    const handleEnterKey = (e) => {
      if (e.key === 'Enter' && city.trim() !== '') {
        console.log(`Fetching weather data for ${city}`);
      }
    };
  
    return (
      <div className="WeatherAppContainer">
        <div className="navigation">
          <button onClick={() => handleButtonClick('current')}>Current Forecast</button>
          <button onClick={() => handleButtonClick('10days')}>10 Days Forecast</button>
        </div>
  
        <div className="location-inputs">
          <CitySelector selectedCity={city} onCityChange={handleCityChange} onEnterKey={handleEnterKey} />
        </div>
  
        {selectedComponent === 'current' && <WeatherForecast city={city} />}
        {selectedComponent === '10days' && <Weather10Days city={city} />}
      </div>
    );
  }
  
  export default WeatherAppContainer;