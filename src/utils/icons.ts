
import { faCloud, faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case 'Clear':
      return faSun;
    case 'Clouds':
      return faCloud;
    case 'Rain':
      return faCloudRain;
    default:
      return faSun;
  }
};