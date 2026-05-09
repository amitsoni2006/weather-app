import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "416ea9b0df0467e88c6ab84801cde148";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city 😅");
      return;
    }

    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found 😢");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong ⚠️");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🌦 Weather App</h1>

        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather">
            <h2>{weather.name}</h2>
            <p className="temp">{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;