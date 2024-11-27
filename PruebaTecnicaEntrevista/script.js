import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
    // Datos de clima simulados
    const mockWeatherData = {
        'New York': {
            temperature: '22°C',
            humidity: '56%',
            windSpeed: '15 km/h',
        },
        'Los Angeles': {
            temperature: '27°C',
            humidity: '45%',
            windSpeed: '10 km/h',
        },
        'London': {
            temperature: '15°C',
            humidity: '70%',
            windSpeed: '20 km/h',
        },
    };

    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [previousSearches, setPreviousSearches] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Función para manejar la búsqueda de ciudades
    const handleSearch = () => {
        if (mockWeatherData[city]) {
            // Si la ciudad está en los datos, actualizamos el estado
            setWeatherInfo(mockWeatherData[city]);
            setErrorMessage('');
            // Agregar la ciudad a la lista de búsquedas previas si no está ya en la lista
            if (!previousSearches.includes(city)) {
                setPreviousSearches([...previousSearches, city]);
            }
        } else {
            // Si la ciudad no está en los datos, mostrar un mensaje de error
            setWeatherInfo(null);
            setErrorMessage('City not found.');
        }
    };

    // Función para manejar el clic en una búsqueda previa
    const handlePreviousSearchClick = (searchedCity) => {
        setCity(searchedCity);
        setWeatherInfo(mockWeatherData[searchedCity]);
        setErrorMessage('');
    };

    return (
        <div>
            <input
                type="text"
                id="citySearch"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
            />
            <button id="searchButton" onClick={handleSearch}>
                Search
            </button>

            <div id="weatherData">
                {weatherInfo ? (
                    <div>
                        <div>Temperature: {weatherInfo.temperature}</div>
                        <div>Humidity: {weatherInfo.humidity}</div>
                        <div>Wind Speed: {weatherInfo.windSpeed}</div>
                    </div>
                ) : (
                    <div>{errorMessage}</div>
                )}
            </div>

            <div id="previousSearches">
                {previousSearches.length > 0 && <h4>Previous Searches:</h4>}
                <ul>
                    {previousSearches.map((searchedCity, index) => (
                        <li key={index} onClick={() => handlePreviousSearchClick(searchedCity)}>
                            {searchedCity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);
