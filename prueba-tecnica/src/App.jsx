// Importamos los hooks.
import { useState } from 'react';

// Inicializamos el componente principal.
const App = () => {
    // Declaramos una variable en el State para almacenar la info del input.
    const [location, setLocation] = useState('');

    // Declaramos una variable en el State para almacenar info de la ciudad
    // de la búsqueda actual (el objeto).
    const [currentCity, setCurrentCity] = useState();

    // Declaramos una variable en el State para almacenar el nombre de las ciudades
    // que hemos buscado con anterioridad.
    const [previousSearches, setPreviousSearches] = useState([]);

    // Instead of requesting data from an API, use this mock data
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
        London: {
            temperature: '15°C',
            humidity: '70%',
            windSpeed: '20 km/h',
        },
    };

    // Función que maneja el evento de click del botón de búsqueda.
    const handleCitySearch = () => {
        // Tratamos de obtener los datos de la ciudad (el objeto). Si no existe una ciudad
        // con ese nombre se almacenará un valor undefined.
        const cityData = mockWeatherData[location];

        // Almacenamos la info de la ciudad (el objeto) en el State.
        setCurrentCity(cityData);

        // Si existe una ciudad con el nombre de la búsqueda almacenamos el nombre de la ciudad
        // en el array de búsquedas previas. No pushearemos el nombre de la ciudad si ya está
        // incluído.
        if (cityData && !previousSearches.includes(location)) {
            setPreviousSearches([...previousSearches, location]);
        }
    };

    // Función que maneja el evento de click del botón de búsquedas previas.
    const handlePreviousSearches = (cityName) => {
        // Buscamos los datos de la ciudad (el objeto).
        const cityData = mockWeatherData[cityName];

        // Establecemos la ciudad actual.
        setCurrentCity(cityData);

        // Establecemos como valor del input el nombre de la ciudad actual.
        setLocation(cityName);
    };

    return (
        <div>
            <input
                type='search'
                id='citySearch'
                placeholder='Search for a city...'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <button id='searchButton' onClick={handleCitySearch}>
                Search
            </button>

            <div id='weatherData'>
                {
                    // Si "currentCity" contiene los datos de una ciudad los mostramos. De lo
                    // contrario indicamos que la ciudad no existe.
                    currentCity ? (
                        <>
                            <div>Temperature: {currentCity.temperature}</div>
                            <div>Humidity: {currentCity.humidity}</div>
                            <div>Wind Speed: {currentCity.windSpeed}</div>
                        </>
                    ) : (
                        <div>City not found.</div>
                    )
                }
            </div>

            <div id='previousSearches'>
                {previousSearches.map((cityName, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => handlePreviousSearches(cityName)}>
                            {cityName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
