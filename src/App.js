import React, { useState } from "react";
import rain from ".//components/rain.mp4";
import haze from ".//components/haze.mp4";
import clear from ".//components/sky.mp4";
import start from ".//components/start.mp4";

const api = {
  key: "3c0c89aaa27ebd4a99e6b3d869912ad7",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    cod: 0,
    message:"",
    weather: [{ main: "start" }],
  });

  const search = (evt) => {
    if (evt.key === "Enter") {
      if (query.trim() !== "") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(typeof result);
            if (result.message !== "city not found") {
              setWeather(result);
            } else {
              var prevState=weather;
              prevState.message=result.message;
              setWeather(prevState);
              setQuery("");
            }
            console.log(weather);
          });
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <video
        autoPlay
        loop
        className="vedio-back"
        style={{ display: "block" ,zIndex:"-100"}
        }
        id="vedio1"
      >
        <source src={start} type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        className="vedio-back"
        style={
          weather.weather[0].main == "Rain"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <source src={rain} type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        className="vedio-back"
        style={
          weather.weather[0].main == "Haze"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <source src={haze} type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        className="vedio-back"
        style={
          weather.weather[0].main == "Clear"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <source src={clear} type="video/mp4" />
      </video>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {weather.cod === 200 ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>

              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>

            <div className="extra">
              <div className="extra-item">
                Humidity = {weather.main.humidity}
              </div>
              <div className="extra-item">
                Pressure = {weather.main.pressure}
              </div>
              <div className="extra-item">
                Wind Speed = {weather.wind.speed}Kmph, {weather.wind.deg}°
              </div>
            </div>
          </div>
        ) :( weather.message ==="city not found" ? (
          <h1 className="warning">INVALID CITY</h1>
        ) : (
          <h1 className="warning">Enter a city</h1>
        ))}
      </main>
    </div>
  );
}
export default App;
