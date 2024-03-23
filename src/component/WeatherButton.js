import React from 'react'
import { Button } from 'react-bootstrap'

const WeatherButton = () => {
   return (
      <div className="weather-button">
         <Button variant="warning">Current Location</Button>
         <Button variant="warning">Paris</Button>
         <Button variant="warning">NewYork</Button>
         <Button variant="warning">TaiPei</Button>
         <Button variant="warning">Barcelona</Button>
      </div>
   )
}

export default WeatherButton
