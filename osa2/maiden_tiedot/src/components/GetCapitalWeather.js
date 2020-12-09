import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GetCapitalWeather = ({ capital }) => {

  const [ capitalWeather, setCapitalWeather ] = useState([])
  const params = {
    access_key: process.env.REACT_APP_WEATHER_API_KEY,
    query: capital
  }

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(res => setCapitalWeather(res.data))
  }, []) 

  const showWeather = () => {
    if (!capitalWeather.current) {
      return <div></div>
    }
    
    return (
      <div>
        <h2>Weather in { capitalWeather.location.name }</h2>
        <img 
          src={ capitalWeather.current.weather_icons }
          alt={ capitalWeather.current.weather_descriptions }
          value={ capitalWeather.current.weather_descriptions }
        />
        <p>
          <b>temperature: </b> { capitalWeather.current.temperature } celcius
        </p>
        <p>
          <b>wind: </b> { capitalWeather.current.wind_speed } mph direction { capitalWeather.current.wind_dir }
        </p>
      </div>
    )
  }

  return showWeather()
}

export default GetCapitalWeather
