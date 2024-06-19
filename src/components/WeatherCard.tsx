import React from 'react';
import { getWeatherIcon } from '../utils/icons';
import { weatherMapping } from '../constants'

interface WeatherCardProps {
  city: string;
  temperature: number;
  weather: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, weather }) => {
  return (
    <div className="weather-card">
      {getWeatherIcon(weather)}
      <div className="label">
        {weatherMapping[weather] ? weatherMapping[weather].toUpperCase() : weather.toUpperCase()}
      </div>
    </div>
  );
};

export default WeatherCard;