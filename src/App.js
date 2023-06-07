import React, { useState } from 'react';
import './index.css'

const API_KEY = '6236ad9c9983e5dacc22c2983672f7b6';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setError('');
      } else {
        setError('Unable to fetch weather data for the selected city.');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <form onSubmit={handleSubmit} className="city-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button type="submit" className="submit-button">
          Get Weather
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2 className="city-name">Current Weather for {weather.name}</h2>
          <p className="temperature">Temperature: {weather.main.temp}°C</p>
          <p className="description">Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

