import React, {useState, useEffect} from 'react'
import '../../App.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
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




const Dashboard = () => {

    // API KEY de unsplash para cambiar background de acuerdo a la ciudad / pais que se busca

    const UNSPLASH_API_KEY = 'YxPvH3Hg0nU0naBlWmXU9_qTC7HJ8yLIv_4J01a5vuI';

  // API KEY de openweathermap 
    const API_KEY = 'da19b776d3c1bee8e7f3c1a091798238';

    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Buenos Aires');
    const [inputValue, setInputValue] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null);




    const handleInput = (e) =>{
        setInputValue(e.target.value)
    }
const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
        return toast("Por favor ingrese una ciudad o país", {
            type: "error",
        });
    }
    setLocation(inputValue);
    const input = document.querySelector('input');
    input.value = '';
}

//Llamo a la api de unsplash

useEffect(() => {
    const getBackgroundImage = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${location}&client_id=${UNSPLASH_API_KEY}`);
    const imageData = await response.json();
    setBackgroundImage(imageData.urls.regular);
    };

    getBackgroundImage();
}, [location]);


//Llamo a la api de openweathermap

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


const backgroundValid = !!backgroundImage;

let icon;

if (data && data.weather && data.weather[0]){
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
}


const date = new Date();

return (
    <div 
    style={backgroundValid 
        ? 
        { backgroundImage: `url(${backgroundImage})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', height:'130vh' } 
        :
        { background: 'app' }
    }
    className='app'>
        <form className='h-16 bg-neutral-700/80 w-full max-w-[450px] rounded-full mb-8 '>
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

    
        <div className='w-full max-w-[450px]  text-white bg-neutral-700/80 rounded-[20px] py-12 px-6'>
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

            {/* Temperatura  */}
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

export default Dashboard