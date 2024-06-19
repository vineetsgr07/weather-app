import React from 'react';

interface ForecastProps {
  day: string;
  temperature: number;
}

const Forecast: React.FC<ForecastProps> = ({ day, temperature }) => {
  return (
    <div className="forecast">
      <div className="day">{day}</div>
      <div className="temperature">{temperature}°</div>
    </div>
  );
};

export default Forecast;