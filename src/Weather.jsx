import React, { useEffect, useState } from 'react';
import Row from './Row';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faSearch } from '@fortawesome/free-solid-svg-icons';
import videoBg from "./assets/bg.mp4";
library.add(faCloudSunRain, faSearch);




const Weather = () => {

  const cData = {
    name: "",
    temp: "",
    feels_like: "",
    temp_min: "",
    temp_max: "",
    icon: "",
    weather: "",
    visibility: "",
    pressure: "",
    humidity: "",
    speed: "",
    deg: "",
    timezone: "",
    country: ""
  }


  const [citySearch, setCity] = useState();
  const [cityData, setCityData] = useState(cData);

  const getWeather = async (city) => {

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
      const apiKey = "c3819559f6bf888b0923ea10687e6a07";


      const response = await fetch(url + city + `&appid=${apiKey}`);
      const result = await response.json();

      // console.log(result);
      // console.log(city);

      setCityData({
        name: result.name,
        temp: Math.round(result.main.temp),
        feels_like: Math.round(result.main.feels_like),
        temp_min: Math.round(result.main.temp_min),
        temp_max: Math.round(result.main.temp_max),
        icon: result.weather[0].icon,
        weather: result.weather[0].main,
        visibility: result.visibility,
        pressure: result.main.pressure,
        humidity: result.main.humidity,
        speed: result.wind.speed,
        deg: result.wind.deg,
        timezone: result.timezone,
        country: result.sys.country
      })


    } catch (error) {
      setCityData(cData);
      console.error(error);
    }
  }

  // for DEFAULT WEATHER CITY 
  useEffect(() => {
    getWeather("Guwahati");
  }, []);


  const change = (e) => {
    setCity(e.target.value);
  }

  // for SEARCHING CITY
  const search = (e) => {
    e.preventDefault();
    // console.log(citySearch);
    getWeather(citySearch);
  }


  return (
    <>
      <main>
        <video src={videoBg} type="video/mp4" autoPlay muted loop plays-inline="true"></video>
        <section className="glass">
          <nav>
            <div className="logo">
              <h1><FontAwesomeIcon icon="cloud-sun-rain" /> WEATHER</h1>
            </div>
            <ul className="links">
              <li><button>HOME</button></li>
              <li><button>CITIES</button></li>
              <li><button>KNOW MORE</button></li>
              <li><button>ABOUT</button></li>
            </ul>
            <div className="status">
              <input type="text" name="city" onChange={change} placeholder="Enter city here" spellCheck="false" /><span><FontAwesomeIcon icon="search" className='search' onClick={search} /></span>
            </div>
          </nav>
          <div className="initialCity">
            <h1 style={{ textTransform: "uppercase" }}>{cityData.name}</h1>
          </div>
          <div className="cards">
            <div className="card">
              <div className="tempHead">
                <h1>Temperature</h1>
              </div>
              <div className="mainValue">
                <h1>{cityData.temp} °C</h1>
              </div>
              <div className="moreInfo">
                <h3>Feels like : <span>{cityData.feels_like} °C</span></h3>
                <h3>Maximum Temp. : <span>{cityData.temp_min} °C</span></h3>
                <h3>Minimum Temp. : <span>{cityData.temp_max} °C</span></h3>
              </div>
            </div>
            <div className="card">
              <div className="tempHead">
                <h1>Weather</h1>
              </div>
              <div className="mainValue">
                <h1>{cityData.weather}<span className='mainWeather'><img src={`http://openweathermap.org/img/w/${cityData.icon}.png`} alt='wIcon' /></span></h1>
              </div>
              <div className="moreInfo">
                <h3>Visibility : <span>{cityData.visibility} m</span></h3>
                <h3>Pressure : <span>{cityData.pressure} mbar</span></h3>
                <h3>Humidity : <span>{cityData.humidity} %</span></h3>
              </div>
            </div>
            <div className="card">
              <div className="tempHead">
                <h1>Wind</h1>
              </div>
              <div className="mainValue">
                <h1>{cityData.speed} km/h</h1>
              </div>
              <div className="moreInfo">
                <h3>Wind degrees : <span>{cityData.deg}°</span></h3>
                <h3>Time-zone : <span>{cityData.timezone}</span></h3>
                <h3>Country : <span>{cityData.country}</span></h3>
              </div>
            </div>
          </div>
          <div className="other">
            <h1>Weathers Of Some Famous Cities</h1>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Temp.</th>
                  <th>Min temp.</th>
                  <th>Max temp.</th>
                  <th>Weather</th>
                  <th>Wind speed</th>
                  <th>Humidity</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <Row specCity="New York" />
                <Row specCity="Tokyo" />
                <Row specCity="Amsterdam" />
                <Row specCity="London" />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );

}

export default Weather;