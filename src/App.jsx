import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Fetch() {
  const [location, setLocation] = useState([])
  const [current, setCurrent] = useState([])
  const [condition, setCodition] = useState([])
  const [place, setPlace] = useState('Dublin')
  const [unitState, setUnitState] = useState(true)

  const fetchWeather = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    const url = `https://api.weatherapi.com/v1/current.json?key=7df0b232de6a40e5b98185143233001&q=${place}`

    try {
      const response = await axios.get(url);
      setLocation(response.data.location);
      setCurrent(response.data.current);
      setCodition(response.data.current.condition);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchWeather()
  }, []);

  return (
    <div className="main">
      <div className="search">
        <form onSubmit={fetchWeather}>
        <input type="text" 
        placeholder="Search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setPlace(e.target.value)
          }
        }}/>
        </form>
        <div className="location">
            <small>latitude: {location.lat} </small>
            <small>longitude: {location.lon}</small>
        </div>
      </div>
      <h1 className="title">Weather in {location.name} at {location.localtime}</h1>
      <div className="weather-section">
        <div className="current">
          <div className="state">
            <div className="state-temp">
              <h1 className="temp">
              { unitState ? current.temp_c : current.temp_f }
              </h1>
                <button className="toggle-btn" onClick={() => setUnitState(!unitState)}><sup>{unitState ? '°C' : '°F'}</sup></button>
            </div>
            <h2>{condition.text}</h2>
          </div>
          <div className="img">
            <img src={`${condition.icon}`} alt={`weather in ${location.name}`} />
          </div>
        </div>  
        <div className="parameters">
          <p><b className="wind">Wind: </b>{current.wind_kph} km/h</p>
          <p><b>Pressure:</b> {current.pressure_mb} hPa</p>
          <p><b>Precipitation:</b> {current.precip_mm}mm</p>
          <p><b>Cloudiness:</b> {current.cloud}%</p>
          <p><b>Humidity:</b> {current.humidity}%</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Fetch />
    </div>
  )
}

export default App