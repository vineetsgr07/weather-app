import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../utils/icons'; // Adjust the path as needed

interface WeatherCardProps {
  city: string;
  temperature: number;
  weather: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, weather }) => {
  return (
    <div className="weather-card">
      <FontAwesomeIcon icon={getWeatherIcon(weather)} className="fa-icon" size="3x" />
      <div className="label">{weather.toUpperCase()}</div>
    </div>
  );
};

export default WeatherCard;
