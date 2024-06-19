import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import WeatherApp from '../WeatherApp';
import { fetchWeather } from '../../utils/fetchWeather';

jest.mock('../../utils/fetchWeather');

const mockFetchWeather = fetchWeather as jest.MockedFunction<typeof fetchWeather>;

const mockWeatherData = {
  Tokyo: {
    city: 'Tokyo',
    temperature: 20,
    weather: 'Clear',
  },
  'New York': {
    city: 'New York',
    temperature: 25,
    weather: 'Clouds',
  },
  Moscow: {
    city: 'Moscow',
    temperature: 10,
    weather: 'Snow',
  },
};

const mockForecastData = {
  Tokyo: [
    { day: 'Tomorrow', temperature: 21 },
    { day: 'Sunday', temperature: 22 },
    { day: 'Monday', temperature: 23 },
  ],
  'New York': [
    { day: 'Tomorrow', temperature: 26 },
    { day: 'Sunday', temperature: 27 },
    { day: 'Monday', temperature: 28 },
  ],
  Moscow: [
    { day: 'Tomorrow', temperature: 11 },
    { day: 'Sunday', temperature: 12 },
    { day: 'Monday', temperature: 13 },
  ],
};

mockFetchWeather.mockResolvedValue({
  weatherDataResults: mockWeatherData,
  forecastDataResults: mockForecastData,
});

describe('WeatherApp', () => {
  it('renders correctly and fetches weather data', async () => {
    render(<WeatherApp />);

    expect(screen.getByText('Not Supported')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('TOKYO')).toBeInTheDocument();
    });

    expect(screen.getByText('TOKYO')).toBeInTheDocument();
    expect(screen.getByText('CURRENT')).toBeInTheDocument();
    expect(screen.getByText('20°')).toBeInTheDocument();

    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('22°')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('23°')).toBeInTheDocument();
  });

  it('switches cities correctly', async () => {
    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText('TOKYO')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('New York'));

    await waitFor(() => {
      expect(screen.getByText('NEW YORK')).toBeInTheDocument();
    });
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('26°')).toBeInTheDocument();
    expect(screen.getByText('27°')).toBeInTheDocument();
    expect(screen.getByText('28°')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Moscow'));

    await waitFor(() => {
      expect(screen.getByText('MOSCOW')).toBeInTheDocument();
    });
    expect(screen.getByText('10°')).toBeInTheDocument();
    expect(screen.getByText('11°')).toBeInTheDocument();
    expect(screen.getByText('12°')).toBeInTheDocument();
    expect(screen.getByText('13°')).toBeInTheDocument();
  });
});
