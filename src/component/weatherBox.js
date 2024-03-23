import React from 'react'

const WeatherBox = ({ weather }) => {
   //console.log('weather?', weather)

   return (
      <div className="weather-box">
         <div>{weather?.name}</div>
         {/* <div>weather && weather.name</div> */}
         <h1>
            {' '}
            {weather?.main.temp}°C / {weather?.main.temp * 1.8 + 32}°F
         </h1>
         <h3>{weather?.weather[0].description}</h3>
         <h3>
            최저 : {weather?.main.temp_min}°C / 최고 : {weather?.main.temp_max}°C
         </h3>
      </div>
   )
}

export default WeatherBox
