import React, {useState, useEffect} from 'react'
import './App.css';
import Loader from './Components/Loader/Loader';
import { 
  WiDayLightning, 
  WiCloudy,
  WiDaySunny, 
  WiDayHaze,
  WiDayShowers,
  WiDaySnow,
  WiDayRain,
  WiThermometer,
  WiCelsius,
  WiHumidity} from "react-icons/wi";
  import {BiSearchAlt2} from "react-icons/bi";




const App = () => {

  // KEY API 
  const API_KEY = 'da19b776d3c1bee8e7f3c1a091798238';

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Buenos Aires');
  const [inputValue, setInputValue] = useState('')


  const handleInput = (e) =>{
    setInputValue(e.target.value)
    
  }

  const handleSubmit = (e) =>{

    if(inputValue !== ''){
      setLocation(inputValue)
    }

    const input = document.querySelector('input');

    input.value = '';

    e.preventDefault();
  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=es&appid=${API_KEY}`;

    fetch(url)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      setData(data)
    })
    .catch(err=>{
      console.log(err)
    })

  }, [location])

// Aca va el spinner 
  if(!data){
    return(
      <div>
        <Loader/>
      </div>
    )
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <WiCloudy/>
      break;
    case 'Haze':
      icon = <WiDayHaze/>
      break;
    case 'Clear':
      icon = <WiDaySunny className='text-[#E9D972]'/>
      break;
    case 'ThunderStorm':
      icon = <WiDayLightning className='text-[#87BCDE]'/>
      break;
    case 'Drizzle':
      icon = <WiDayShowers className='text-[#87BCDE]'/>
      break;
    case 'Snow':
      icon = <WiDaySnow className='text-[#87BCDE]'/>
      break;
    case 'Rain':
      icon = <WiDayRain className='text-[#87BCDE]'/>
      break;
  }
  const date = new Date();
  
  return (
    <div className='app'>
      <form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full mb-8 '>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
          onChange={(e)=>handleInput(e)}
          type='text' 
          placeholder='Buscar' 
          className='flex-1 bg-transparent outline-none placeholder:text-white text-white h-full'/>
          <button 
          onClick={(e)=>handleSubmit(e)}
          className='bg-[#432372] w-20 h-12 rounded-full text-white text-lg flex justify-center items-center hover:bg-[#432372e4]'>
            <BiSearchAlt2/>
          </button>
        </div>
      </form>

      {/* <form>
        <div>
          <input 
          onChange={(e)=>handleInput(e)}
          type="text" 
          placeholder="Buscar Ciudad/Pais" 
          className="input w-75 max-w-xs" />
          <button 
          onClick={(e)=>handleSubmit(e)}
          className="btn btn-circle  btn-primary btn-outline btn-md">
            <BiSearchAlt2 />
          </button>
        </div>
      </form> */}

      <div className='w-full max-w-[450px]  text-white bg-black/20 rounded-[20px] py-12 px-6'>
        {/* Info Pais y fecha */}
        <div className='bg-purple-100/30 flex items-center gap-x-5'>
          <div className='text-[100px]'>{icon}</div>
          <div>
            <div className='text-2xl font-medium'>{data.name}, {data.sys.country}</div>
          </div>
          <div>
            <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
          </div>
        </div>

        {/* Temperatura */}
        <div className='my-10'>
          <div className='flex justify-center items-center'>
            <div className='text-[125px] font-light'>
              {parseInt(data.main.temp)}
            </div>
            <div className='text-5xl font-bold'>
              <WiCelsius />
            </div>
          </div>
        </div>

        <div className='capitalize text-center text-medium py-3'>
          {data.weather[0].description}
        </div>
        <div className='flex py-2'>
          <div className='text-[20px]'>
            <WiThermometer/>
          </div>
          <div className='flex'>
            <p>Sensación Termica</p>
            <p className='px-2'>{parseInt(data.main.feels_like)} °C</p>
          </div>
        </div>
        <div className='flex py-2'>
          <div className='text-[20px]'>
            <WiHumidity/>
          </div>
          <div className='flex'>
            <p>Humedad</p>
            <p className='px-2'>{data.main.humidity} %</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
