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

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [temp, setTemp] = useState("");
    const [tempRange, setTempRange] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("");
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

        setLoading(true);

        getWeather(cityName)
        .then(weatherData => {

            const name = weatherData.name;
            const temp = Math.round(weatherData.main.temp);
            const minTemp = Math.round(weatherData.main.temp_min);
            const maxTemp = Math.round(weatherData.main.temp_max);
            const condition = weatherData.weather[0].main;
            const humidityValue = weatherData.main.humidity;
            const windSpeed = Math.round(weatherData.wind.speed);
            const somatosensory = Math.round(weatherData.main.feels_like);

            setName(name);
            setTemp(temp);
            setTempRange({ minTemp: minTemp, maxTemp: maxTemp });
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
        })
        .finally(() => {
            setLoading(false);
        })
    }, [cityName]);
      
    const currentWeatherIcon = weatherIcons[weatherCondition] || sunny;
    const currentWeatherImage = weatherImages[weatherCondition] || sunny_background;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <WeatherImage imageUrl={currentWeatherImage} className="absolute top-0 right-0"/>
                <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
                    Loading...
                </h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center space-y-7">
            <WeatherImage imageUrl={currentWeatherImage} className="absolute top-0 right-0"/>
            <Date value={currentTime} className="text-white"/>
            <Name value={name} className="text-white text-3xl font-bold"/>
            <Temperature value={temp} className="text-slate-200 text-8xl font-bold"/>
            <TemperatureRange minTemp={tempRange.minTemp} maxTemp={tempRange.maxTemp} className="text-white"/>
            <WeatherIcon imageUrl={currentWeatherIcon}/>
            <Meta humidityValue={humidity} windSpeed={windSpeed} airQualityValue={airQuality} somatosensoryValue={somatosensory}/>
        </div>
    )
}

export default CurrentCity