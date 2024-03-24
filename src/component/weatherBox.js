import React from 'react'

const WeatherBox = ({ weather }) => {
   //console.log('weather?', weather)

   // const temperatureC = weather && weather.main ? (weather.main.temp - 273.15).toFixed(2) : ''
   // const temperatureF = weather && weather.main ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2) : ''

   return (
      <div className="weather-box">
         <div className="location_title">{weather?.name}</div>
         {/* <div>weather && weather.name</div> */}
         <h1>
            {' '}
            {(+weather?.main.temp).toFixed(2)}°C / {(+(Math.round(weather?.main.temp * 1.8 + 32) * 100) / 100).toFixed(2)}°F
         </h1>
         <h3>{weather?.weather[0].description}</h3>
         <h5>
            최저 : {(+weather?.main.temp_min).toFixed(2)}°C / 최고 : {(+weather?.main.temp_max).toFixed(2)}°C
         </h5>
      </div>
   )
}

export default WeatherBox
