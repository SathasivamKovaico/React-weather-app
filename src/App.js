import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // OpenWeatherMap API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="App">
      <div className="container">
        <h1 className="title">🌤️ Weather Dashboard</h1>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
          <button onClick={fetchWeather} className="button">
            Search
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        
        {error && <p className="error">{error}</p>}

        {weather && !loading && (
          <div className="weather-card">
            <h2 className="city-name">
              {weather.name}, {weather.sys.country}
            </h2>
            
            <div className="temp-container">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="icon"
              />
              <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
            </div>

            <p className="description">
              {weather.weather[0].description.toUpperCase()}
            </p>

            <div className="details">
              <div className="detail-item">
                <p className="detail-label">Feels Like</p>
                <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Humidity</p>
                <p className="detail-value">{weather.main.humidity}%</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Wind Speed</p>
                <p className="detail-value">{weather.wind.speed} m/s</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Pressure</p>
                <p className="detail-value">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
