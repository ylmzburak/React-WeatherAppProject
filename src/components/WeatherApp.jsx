import React, { useState, useEffect } from 'react'
import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'

const WeatherApp = () => {

  const [data, setData] = useState({})
  const [location, setLocation] = useState()

  const api_key = import.meta.env.VITE_API_KEY
  

   useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = 'Sinop'
      const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${defaultLocation}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
    }
    fetchDefaultWeather()
  }, [])

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      search()
    }
  }
  
  
  

  const search = async() => {
    if(location.trim() !== ''){
      const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`
      const res = await fetch(url)
      const searchData = await res.json()
      console.log(searchData)
      setData(searchData)
      setLocation("")
      } 
  }

  const weatherImages = {
    "Mist": cloudy,
    "Patchy rain nearby": rainy,
    "Patchy snow nearby": snowy,
    "Patchy sleet nearby": snowy,
    "Patchy freezing drizzle nearby": rainy,
    "Thundery outbreaks nearby": rainy,
    "Blowing snow": snowy,
    "Blizzard": snowy,
    "Fog": cloudy,
    "Freezing fog": cloudy,
    "Patchy light drizzle": rainy,
    "Light drizzle": rainy,
    "Freezing drizzle": rainy,
    "Heavy freezing drizzle": rainy,
    "Patchy light rain": rainy,
    "Light rain": rainy,
    "Moderate rain at times": rainy,
    "Moderate rain": rainy,
    "Heavy rain at times": rainy,
    "Heavy rain": rainy,
    "Light freezing rain": rainy,
    "Moderate or heavy freezing rain": rainy,
    "Light sleet": snowy,
    "Moderate or heavy sleet": snowy,
    "Patchy light snow": snowy,
    "Light snow": snowy,
    "Patchy moderate snow": snowy,
    "Moderate snow": snowy,
    "Patchy heavy snow": snowy,
    "Heavy snow": snowy,
    "Ice pellets": snowy,
    "Light rain shower": rainy,
    "Moderate or heavy rain shower": rainy,
    "Torrential rain shower": rainy,
    "Light sleet showers": snowy,
    "Moderate or heavy sleet showers": snowy,
    "Light snow showers": snowy,
    "Moderate or heavy snow showers": snowy,
    "Light showers of ice pellets": snowy,
    "Moderate or heavy showers of ice pellets": snowy,
    "Patchy light rain with thunder": rainy,
    "Moderate or heavy rain with thunder": rainy,
    "Patchy light snow with thunder": snowy,
    "Moderate or heavy snow with thunder": snowy,
    "Sunny": sunny,
    "Clear": sunny,
    "Partly cloudy": cloudy,
    "Cloudy": cloudy,
    "Overcast": cloudy,
  }

  const weatherImage = weatherImages[data?.current?.condition?.text] || null

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data?.location?.name}</div>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
               onKeyDown={handleKeyDown}/>
            <i className="fa-solid fa-magnifying-glass-location" onClick={search}></i>
          </div>

        </div>
        <div className="weather">
          <img src={weatherImage} />
          <div className="weather-type">{data.current ? `${data.current.condition.text}` :  null}</div>
          <div className="temp">{data.current ? `${Math.floor(data.current.temp_c)}°` : null}</div> 
          <div className="weather-bottom">
            <div className="weather-date">
            <p>{data.location ? `${data.location.localtime}` : null}</p>
          </div>
          <div className="weather-data">
            <div className="humidity">
              <div className="data-name">Humidity</div>
              <i className="fa-solid fa-droplet"></i>
              <div className="data">{data.current ? `${Math.floor(data.current.humidity)}%` : null}</div>
            </div>
            <div className="wind">
              <div className="data-name">Wind</div>
              <i className="fa-solid fa-wind"></i>
              <div className="data">{data.current ? `${Math.floor(data.current.wind_kph)} km/h ` : null}</div>
            </div>
          </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
