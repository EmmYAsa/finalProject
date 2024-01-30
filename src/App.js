import React, { useState } from 'react';
import WeatherAppContainer from './components/WeatherAppContainer';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('currency');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <div className="main_navigation">
        <button onClick={() => handleComponentChange('currency')}>Курс валют</button>
        <button onClick={() => handleComponentChange('weather')}>Прогноз погоди</button>
      </div>
      <div className='main_container'>
        {selectedComponent === 'currency' && <CurrencyConverter />}
        {selectedComponent === 'weather' && <WeatherAppContainer />}
      </div>

    </div>
  );
}

export default App;
