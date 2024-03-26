import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeatherBox from './component/weatherBox'
import WeatherButton from './component/WeatherButton'
import ClipLoader from 'react-spinners/ClipLoader'
import { Container } from 'react-bootstrap'

//user_story
// 1. 앱이 실행되자 마자 현재위치기반의 날씨가 보인다
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재위치기반 날씨버튼을 클릭하면 다시 현재위치 기반 날씨가 나온다.
//6. 테이터를 들고오는 동안 로딩 스피너가 돈다.

const API_KEY = process.env.REACT_APP_API_KEY
const cities = ['Seoul', 'Paris', 'New York', 'Barcelona']

function App() {
   const [loading, setLoading] = useState(false)
   const [city, setCity] = useState(null)
   const [weather, setWeather] = useState(null)
   const [apiError, setAPIError] = useState('')

   const getWeatherByCurrentLocation = async (lat, lon) => {
      try {
         let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
         let response = await fetch(url)
         let data = await response.json()

         setWeather(data)
         setLoading(false)
      } catch (err) {
         setAPIError(err.message)
         setLoading(false)
      }
      //console.log('현재날씨는?', data)
   }
   const getCurrentLocation = () => {
      //console.log('getCurrentLocation')
      navigator.geolocation.getCurrentPosition((position) => {
         const { latitude, longitude } = position.coords
         //console.log('현재 위치', lat, lon)
         getWeatherByCurrentLocation(latitude, longitude)
      })
   }

   const getWeatherByCity = async () => {
      try {
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

         const response = await fetch(url)
         const data = await response.json()

         setWeather(data)
         setLoading(false)
      } catch (err) {
         setAPIError(err.message)
         setLoading(false)
      }
      //console.log('data?', data)
   }
   useEffect(() => {
      if (city == null) {
         setLoading(true)
         getCurrentLocation()
      } else {
         setLoading(true)
         getWeatherByCity()
      }
   }, [city])

   const handleCityChange = (city) => {
      if (city === 'current') {
         setCity(null)
      } else {
         setCity(city)
      }
   }

   //  useEffect(() => {
   //     //console.log('city?', city)
   //     getWeatherByCity()
   //  }, [city])

   return (
      <div>
         <Container className="vh-100">
            {loading ? (
               <div className="container">
                  <ClipLoader color="#f88c6b" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
               </div>
            ) : !apiError ? (
               <div className="container">
                  <WeatherBox weather={weather} />
                  <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
               </div>
            ) : (
               apiError
            )}
         </Container>
      </div>
   )
}

export default App
