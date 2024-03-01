import React, { useEffect, useState } from 'react';


const Row = (props) => {

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
  const [cityData, setCityData] = useState(cData);

  const getSpecWeather = async (city) => {

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
      const apiKey = "c3819559f6bf888b0923ea10687e6a07";


      const response = await fetch(url + city + `&appid=${apiKey}`);
      const result = await response.json();

      // console.log(result);
      // console.log(city);

      if (city) {
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
      } else {
        setCityData(cData);
      }



    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSpecWeather(props.specCity);
  }, [])

  return (
    <tr>
      <td>{cityData.name}</td>
      <td>{cityData.temp} °C</td>
      <td>{cityData.temp_min} °C</td>
      <td>{cityData.temp_max} °C</td>
      <td>{cityData.weather}<span><img src={`http://openweathermap.org/img/w/${cityData.icon}.png`} alt='alt wicon' /></span></td>
      <td>{cityData.speed} km/h</td>
      <td>{cityData.humidity} %</td>
      <td>{cityData.country}</td>
    </tr>
  );
}

export default Row;