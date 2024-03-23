import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeatherBox from './component/weatherBox'
import WeatherButton from './component/WeatherButton'

//user_story
// 1. 앱이 실행되자 마자 현재위치기반의 날씨가 보인다
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재위치기반 날씨버튼을 클릭하면 다시 현재위치 기반 날씨가 나온다.
//6. 테이터를 들고오는 동안 로딩 스피너가 돈다.
const API_KEY = '4981d7f9cbab6c15c49688b7d0447386'

function App() {
   const [weather, setWeather] = useState(null)
   const cities = ['Seoul', 'Paris', 'NewYork', 'Barcelona']

   const getCurrentLocation = () => {
      console.log('getCurrentLocation')
      navigator.geolocation.getCurrentPosition((position) => {
         let lat = position.coords.latitude
         let lon = position.coords.longitude
         //console.log('현재 위치', lat, lon)
         getWeatherByCurrentLocation(lat, lon)
      })
   }
   const getWeatherByCurrentLocation = async (lat, lon) => {
      //console.log('getWeatherByCurrentLocation')
      let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
      //console.log('현재날씨는?', data)
   }

   useEffect(() => {
      getCurrentLocation()
   }, [])

   return (
      <div>
         <div className="container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} />
         </div>
      </div>
   )
}

export default App
