import React, { useState, useEffect } from 'react';
import './Weather10Days.css'


const Weather10Days = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [currentCity, setCurrentCity] = useState(city);

  useEffect(() => {
    if (city.trim() !== '') {
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=867bf6b42eca406f9e2448f2407a2384&days=10`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setForecastData(data.data))
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);  

  return (
    <div>
      {forecastData ? (
        <div>
          <h2>{`${currentCity}`}</h2>
          <ul>
            {forecastData.map((day, index) => (
              <li key={index}>
                <p>Date: {day.datetime}</p>
                <p>{day.temp} °C</p>
                <p>{day.weather.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather10Days;
