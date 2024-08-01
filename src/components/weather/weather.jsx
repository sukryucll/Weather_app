import { useEffect, useState } from "react";
import Search from "../search/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faWind,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

export default function Weather() {
  const [search, setSearch] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8f6d114a1c53ad92fbbc07213c514786`
      );

      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Istanbul");
  }, []);
  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp_desc_container">
            <div className="temp">
              {(weatherData?.main?.temp - 273.13).toFixed(1)}{" "}
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
            </div>
            <p className="description">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
          </div>

          <div className="weather-info">
            <div>
              <div>
                <FontAwesomeIcon icon={faWind} />
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div>
              <div>
                <FontAwesomeIcon icon={faDroplet} />
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
