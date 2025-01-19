import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useRef } from 'react';

const Weather = () => {

    const inputRef=useRef();

    const [weatherdata,setweatherdata]=useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": rain_icon, // Add thunderstorm if needed
        "11n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": cloud_icon, // Mist/fog
        "50n": cloud_icon,
      };
      
    const search=async(city)=>
    {
        if(city=="")
        {
            alert("enter City name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response=await fetch(url);
            const data= await response.json();
            console.log(data.weather[0].icon);
            const icon=allIcons[data.weather[0].icon]|| clear_icon;
            setweatherdata({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })

        }
        catch(error){
            setweatherdata(false);
            console.error("Error in fetching wetaher data");

        }
    }
    useEffect(() => {
        search("London");
      }, []);
      

  return (
    <div className='weather' >
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        


        <img src={weatherdata.icon} alt="" className='weather_icon'/>
        <p className='temperature'>{weatherdata.temperature}°C </p>
        <p className='location'>{weatherdata.location}</p>
        <div className="weather_data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherdata.humidity}</p>
                    <span>Humidity </span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherdata.windspeed}</p>
                    <span>Wind Speed </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather