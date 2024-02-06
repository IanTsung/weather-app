import { useState, useEffect } from "react"
import DayOfWeek from "./components/DayOfWeek"
import getWeather from "../../../../apis/getWeather"
import getForecast from "../../../../apis/getForecast"
//Importing Icons
import cloudy from "../../../WeatherIcon/assets/Cloudy.png"
import cloudyDay from "../../../WeatherIcon/assets/Cloudy_day.png"
import hail from "../../../WeatherIcon/assets/Hail.png"
import rain from "../../../WeatherIcon/assets/Rain.png"
import snow from "../../../WeatherIcon/assets/Snow.png"
import sunny from "../../../WeatherIcon/assets/Sunny.png"

const Forecast = ({ cityName }) => {

    const [forecastData, setForecastData] = useState([]);

    const weatherIcons = {
        Clouds: cloudy,
        CloudyDay : cloudyDay,
        Clear: sunny,
        Snow: snow,
        Rain: rain,
        Drizzle: rain,
        Thunderstorm: hail,
    };

    function formatDate(date) {
        const day = date.getDate();
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = date.getMonth();
        const formattedDate = `${day} ${month[monthIndex]}`;
        return formattedDate;
    }

    function getDayName(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        return dayName;
    }      

    useEffect(() => {
        getWeather(cityName)
        .then(weatherData => {
            const { lon, lat } = weatherData.coord;
            return getForecast(lat, lon);
        })
        .then(forecastData => {
            const fourDayForecastData = forecastData.map(day => ({
                date: new Date(day.dt * 1000),
                tempRange: `${Math.round(day.temp.min)} - ${Math.round(day.temp.max)}`,
                weatherIcon: weatherIcons[day.weather[0].main] || sunny
            }));
            setForecastData(fourDayForecastData);
        })
        .catch(error => console.error("Error fetching forecast data: ", error));
    }, [cityName]);

    return (
        <div className="flex flex-initial items-center p-4 space-x-6">
            {forecastData.map((day, index) => (
                <DayOfWeek 
                    key={index} 
                    nameValue={getDayName(day.date)}
                    dateValue={formatDate(day.date)} 
                    tempValue={day.tempRange} 
                    imgUrl={day.weatherIcon}
                />
            ))}
        </div>
    )
}

export default Forecast