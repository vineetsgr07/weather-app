import React from 'react';

interface TemperatureDisplayProps {
  label: string;
  temperature: number;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ label, temperature }) => {
  return (
    <div>
      <div className='temperature'>{temperature}°</div>
      <div className='label'>{label}</div>
    </div>
  );
};

export default TemperatureDisplay;