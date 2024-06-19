"use client";

import React, { useState, useEffect, FC } from 'react';

import Forecast from './Forecast';
import WeatherCard from './WeatherCard';
import TemperatureDisplay from './TemperatureDisplay';
import { fetchWeather } from '../utils/fetchWeather';

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
}

interface ForecastData {
  day: string;
  temperature: number;
}

const WeatherApp: FC = () => {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [forecastData, setForecastData] = useState<Record<string, ForecastData[]>>({});
  const [selectedCity, setSelectedCity] = useState<string>('Tokyo');
  const cities = ['Tokyo', 'New York', 'Moscow'];

  useEffect(() => {
    const fetchData = async () => {
      const { weatherDataResults, forecastDataResults } = await fetchWeather(cities, process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY!);
      setWeatherData(weatherDataResults);
      setForecastData(forecastDataResults);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="weather-app">
        <div className="city-tabs">
          {cities.map((city) => (
            <button key={city} onClick={() => setSelectedCity(city)} className={selectedCity === city ? 'active' : ''}>
              {city.toUpperCase()}
            </button>
          ))}
        </div>
        {weatherData[selectedCity] && (
          <div className="weather-display">
            <div className="city-name">
              {selectedCity.toUpperCase()}
            </div>
            <div className="current-weather">
              <TemperatureDisplay label="CURRENT" temperature={weatherData[selectedCity].temperature} />
            </div>
            <div className="weather-icon">
              <WeatherCard
                city={weatherData[selectedCity].city}
                temperature={weatherData[selectedCity].temperature}
                weather={weatherData[selectedCity].weather}
              />
            </div>
            <div className="future-weather">
              {forecastData[selectedCity]?.map((forecast, index) => (
                <Forecast key={forecast.day} day={index === 0 ? "TOMORROW" : forecast.day.toUpperCase()} temperature={forecast.temperature} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="not-supported">Not Supported</div>
    </div>
  );
};

export default WeatherApp;
