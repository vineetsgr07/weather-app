

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const processForecastData = (forecastData: ForecastApiResponse): ForecastData[] => {
  const forecastDays = forecastData.list
    ? forecastData.list.filter((_, index) => index % 8 === 0).slice(1, 4)
    : [];

  return forecastDays.map((item) => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
    temperature: Math.round(item.main.temp),
  }));
};

export const fetchWeather = async (cities: string[], apiKey: string) => {
  const promises = cities.map(async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const weatherData = await fetchData<WeatherApiResponse>(weatherUrl);
    const forecastData = await fetchData<ForecastApiResponse>(forecastUrl);

    return {
      city,
      weather: {
        city,
        temperature: Math.round(weatherData.main.temp),
        weather: weatherData.weather[0].main,
      },
      forecast: processForecastData(forecastData),
    };
  });

  const results = await Promise.all(promises);
  const weatherDataResults: Record<string, WeatherData> = {};
  const forecastDataResults: Record<string, ForecastData[]> = {};

  results.forEach(({ city, weather, forecast }) => {
    weatherDataResults[city] = weather;
    forecastDataResults[city] = forecast;
  });

  return { weatherDataResults, forecastDataResults };
};

interface WeatherApiResponse {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
}

interface ForecastApiResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
  }[];
}

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
}

interface ForecastData {
  day: string;
  temperature: number;
}