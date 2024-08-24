import React, { useState } from "react";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const getWeather = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02e73e24b59fe25231bffd861696bcc2&units=metric`
            );
            if (!response.ok) {
                throw new Error("City not found!");
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
    };

    return (
        <div className="weather-container">
            <div className="input">
                <form onSubmit={getWeather}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter a city"
                    />
                    <button type="submit">Get Weather</button>
                </form>
            </div>
            <div className="weather-info">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {weather && (
                    <div className="card">
                        <h2>{weather.name}</h2>
                        <p>{weather.weather[0].description}</p>
                        <p>Temperature: {weather.main.temp} °C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
