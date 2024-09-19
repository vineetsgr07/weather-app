# Weather App

A simple weather application built with Next.js that displays real-time weather data for three cities using the OpenWeatherMap API.

### [Demo](https://weather-app-zeta-swart.vercel.app/)

## Features

- Displays current weather and 3-day forecast for selected cities.
- Responsive design.
- Periodically updates weather data every 5 seconds.
- Uses FontAwesome icons for weather representation.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-vineetsgr/weather-app.git
    cd weather-app
    ```

2. **Install dependencies**:
    ```bash
    yarn install
    ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
    ```bash
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
    ```

## Running the App

1. **Start the development server**:
    ```bash
    yarn dev
    ```

2. **Build the application for production**:
    ```bash
    yarn build
    yarn start
    ```

## Testing

1. **Run tests**:
    ```bash
    yarn test
    ```