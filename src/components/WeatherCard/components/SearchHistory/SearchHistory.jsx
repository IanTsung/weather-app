import { useState, useEffect } from "react"
import getWeather from "../../../../apis/getWeather"
import City from "./components/City"
//Importing Icons
import cloudy from "../../../WeatherIcon/assets/Cloudy.png"
import cloudyDay from "../../../WeatherIcon/assets/Cloudy_day.png"
import hail from "../../../WeatherIcon/assets/Hail.png"
import rain from "../../../WeatherIcon/assets/Rain.png"
import snow from "../../../WeatherIcon/assets/Snow.png"
import sunny from "../../../WeatherIcon/assets/Sunny.png"

const SearchHistory = ({ searchHistory }) => {

    const [citiesWeather, setCitiesWeather] = useState([]);

    const bgColors = ['bg-[#6495f4]', 'bg-[#6294f3]', 'bg-[#6176e7]', 'bg-[#746ddf]'];

    const weatherIcons = {
        Clouds: cloudy,
        CloudyDay : cloudyDay,
        Clear: sunny,
        Snow: snow,
        Rain: rain,
        Drizzle: rain,
        Thunderstorm: hail,
    };

    useEffect(() => {

        const fetchCitiesWeather = async () => {
            const weatherPromises = searchHistory.map(city => getWeather(city));
            try {
                const weatherData = await Promise.all(weatherPromises);
                const fourCitiesWeatherData = weatherData.map(cityData => ({
                    name: cityData.name,
                    tempRange: `${Math.round(cityData.main.temp_min)} - ${Math.round(cityData.main.temp_max)}`,
                    weatherIcon: weatherIcons[cityData.weather[0].main] || sunny
                }));
                setCitiesWeather(fourCitiesWeatherData);
            } catch (error) {
                console.error("Error fetching cities weather data:", error);
            }
        };

        fetchCitiesWeather();

    }, [searchHistory]);

    return (
        <div className="flex flex-initial items-center w-full px-4 space-x-6">
            {citiesWeather.map((city, index) => 
                <City 
                    key={index}
                    imgUrl={city.weatherIcon}
                    nameValue={city.name}
                    tempValue={city.tempRange}
                    className={bgColors[index % bgColors.length]}
                />
            )}
        </div>
    )
}

export default SearchHistory