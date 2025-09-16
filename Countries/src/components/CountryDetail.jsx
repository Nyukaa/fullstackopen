// const CountryDetail = ({ country }) => {
//   return (
//     <div>
//       <h2>{country.name.common}</h2>
//       <img src={country.flags.png} alt={country.name.common} width="200" />
//       <p>Capital: {country.capital}</p>
//
//       <p>Languages: {Object.values(country.languages).join(", ")}</p>
//     </div>
//   );
// };
// export default CountryDetail;
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_KEY; // твой ключ OpenWeatherMap

  useEffect(() => {
    if (!country.capital) return;

    const capital = country.capital;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;

    axios
      .get(url)
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Ошибка при получении погоды:", error));
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages:</h3>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <h3>Weather in {country.capital}</h3>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default CountryDetail;
