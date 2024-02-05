import { useState, useEffect } from "react"
import getWeather from "../../../../apis/getWeather"
import getAirQuality from "../../../../apis/getAirQuality"
import Date from "../../../Date"
import Name from "../../../Name"
import Temperature from "./components/Temperature"
import Meta from "./components/Meta"
import TemperatureRange from "../../../TemperatureRange"
import WeatherIcon from "../../../WeatherIcon"
import WeatherImage from "./components/WeatherImage"
// Importing Icons
import cloudy from "../../../WeatherIcon/assets/Cloudy.png"
import cloudyDay from "../../../WeatherIcon/assets/Cloudy_day.png"
import hail from "../../../WeatherIcon/assets/Hail.png"
import rain from "../../../WeatherIcon/assets/Rain.png"
import snow from "../../../WeatherIcon/assets/Snow.png"
import sunny from "../../../WeatherIcon/assets/Sunny.png"
// Importing BackgroundImages
import cloudy_background from "./assets/Cloudy_day_background.png"
import hail_background from "./assets/Hail_background.png"
import rain_background from "./assets/Rain_background.png"
import snow_background from "./assets/Snow_background.png"
import sunny_background from "./assets/Sunny day_background.png"

const CurrentCity = ({ cityName, currentTime }) => {

    const [temp, setTemp] = useState("");
    const [tempRange, setTempRange] = useState("loading...");
    const [weatherCondition, setWeatherCondition] = useState("loading...");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [airQuality, setAirQuality] = useState("");
    const [somatosensory, setSomatosensory] = useState("");

    const weatherIcons = {
        Clouds: cloudy,
        CloudyDay : cloudyDay,
        Clear: sunny,
        Snow: snow,
        Rain: rain,
        Drizzle: rain,
        Thunderstorm: hail,
    };

    const weatherImages = {
        Clouds: cloudy_background,
        CloudyDay : cloudy_background,
        Clear: sunny_background,
        Snow: snow_background,
        Rain: rain_background,
        Drizzle: rain_background,
        Thunderstorm: hail_background,
    }

    useEffect(() => {
        getWeather(cityName)
        .then(weatherData => {

            const temp = Math.round(weatherData.main.temp);
            const minTemp = Math.round(weatherData.main.temp_min);
            const maxTemp = Math.round(weatherData.main.temp_max);
            const condition = weatherData.weather[0].main;
            const humidityValue = weatherData.main.humidity;
            const windSpeed = Math.round(weatherData.wind.speed);
            const somatosensory = Math.round(weatherData.main.feels_like);

            setTemp(temp);
            setTempRange(`${minTemp} - ${maxTemp}`);
            setWeatherCondition(condition);
            setHumidity(humidityValue);
            setWindSpeed(windSpeed);
            setSomatosensory(somatosensory);

            const { lon, lat } = weatherData.coord;
            return getAirQuality(lat, lon);
        })
        .then(airQualityData => {
            const airQuality = Math.round(airQualityData.list[0].components.pm2_5);
            setAirQuality(airQuality);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    }, [cityName]);
      
    const currentWeatherIcon = weatherIcons[weatherCondition] || sunny;
    const currentWeatherImage = weatherImages[weatherCondition] || sunny_background;

    return (
        <div className="flex flex-col items-center space-y-7">
            <WeatherImage imageUrl={currentWeatherImage} className="absolute top-0 right-0"/>
            <Date value={currentTime} className="text-white"/>
            <Name value={cityName} className="text-white text-3xl font-bold"/>
            <Temperature value={temp} className="text-slate-200 text-8xl font-bold"/>
            <TemperatureRange value={tempRange} className="text-white"/>
            <WeatherIcon imageUrl={currentWeatherIcon}/>
            <Meta humidityValue={humidity} windSpeed={windSpeed} airQualityValue={airQuality} somatosensoryValue={somatosensory}/>
        </div>
    )
}

export default CurrentCity