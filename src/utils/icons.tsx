import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import SunIcon from '../icons/SunIcon.svg';

const SunBright: React.FC = () => (
  <div className="sun-icon-wrapper">
    <SunIcon className="icon sun-icon" />
  </div>
);


export const getWeatherIcon = (weather: string): JSX.Element => {
  switch (weather) {
    case 'Clear':
      return <SunBright />;
    case 'Clouds':
      return <FontAwesomeIcon icon={faCloud} className="fa-icon" size="3x" />;
    case 'Rain':
      return <FontAwesomeIcon icon={faCloudRain} className="fa-icon" size="3x" />;
    default:
      return <SunBright />;
  }
};