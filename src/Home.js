import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';



import './style.css';
import serch from './images/search.png'
import cloudy from './images/cloudy.png'
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";
import clear from "./images/clear.png";
import hrizzle from "./images/hrizzle.png";
import rain from "./images/rain.png";
import mist from "./images/mist.png";
const Home = () => {
  const [data,setData] = useState({
    celcius : 10,
    name: 'Colombo',
    humidity:10, 
    speed:2,
    image:''
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handaleClick =() =>{
    if(name !== "") {
      const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8ed71e652d6cdf023c7a86c781da2a74&units=metric`;
    axios.get(apiUrl)
    .then(res =>{ 
      let imagePath = '';
      if(res.data.weather[0].main == "Clouds"){
        imagePath = cloudy
      }else if(res.data.weather[0].main == "Clear"){
        imagePath = clear
      }else if(res.data.weather[0].main == "Rain"){
        imagePath = rain
      }else if(res.data.weather[0].main == "Drizzle"){
        imagePath = hrizzle
      }else if(res.data.weather[0].main == "Mist"){
        imagePath = mist
      } else {
        imagePath = cloudy
      }
      
      setData({...data, celcius: res.data.main.temp, name:res.data.name,
         humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image:imagePath })
        setError("");
    })
    .catch(err => {
      if(err.response.status == 404){
        setError("Invalid City Name")
      }else{
        setError("");
      }
      console.log(err)
    });
    }
  }
  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
            <input type='text' placeholder='Enter City Name' onChange={e =>setName(e.target.value)}></input>
            <button><img src={serch} alt='' onClick={handaleClick}/></button> 
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='infor'>
          <img src={data.image} alt=''></img>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src={humidity}></img>
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
            <img src={wind}></img>
              <div className='wind'>
                <p>{Math.round(data.speed)}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
