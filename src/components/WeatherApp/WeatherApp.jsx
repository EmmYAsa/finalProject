
import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import img from '../../img/icons8-temperature-67.png';
import img2 from '../../img/icons8-humidity-50.png';
import img3 from '../../img/icons8-sunrise-50.png'
const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (city.trim() !== '') {
      const apiUrl = `https://api.weatherbit.io/v2.0/current?&city=${city}&country=US&key=867bf6b42eca406f9e2448f2407a2384&include=minutely`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setForecastData(data.data[0]))
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);

  return (
    <div>
      {forecastData && (
        <div>
          <h2>{forecastData.city_name}</h2>
          <div>
            <p className='temp'>{forecastData.temp} <span>°C</span></p>
            <div className="center-container">
              <img src={img} alt="Temperature" />
            </div>

            <section className='info'>
              <div>
                <img src={img2} alt="Humidity" />
                <p>{forecastData.rh}%</p>
              </div>
              <div>
                <img src={img3} alt="img3" />
                <p>{forecastData.sunrise}</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
