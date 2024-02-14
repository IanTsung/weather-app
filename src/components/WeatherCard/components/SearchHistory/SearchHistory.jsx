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
//Importing BackgroundImage
import london from "./assets/London.png"
import newYork from "./assets/Newyork.png"
import shanghai from "./assets/Shanghai.png"
import sydney from "./assets/sydney.png"

const SearchHistory = ({ searchHistory, onCitySelect }) => {

    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [citiesWeather, setCitiesWeather] = useState([]);

    const weatherIcons = {
        Clouds: cloudy,
        CloudyDay : cloudyDay,
        Clear: sunny,
        Snow: snow,
        Rain: rain,
        Drizzle: rain,
        Thunderstorm: hail,
        Haze : cloudyDay,
        Default: sunny
    };

    const bgColors = {
        Clouds: 'bg-cloudy',
        CloudyDay : 'bg-cloudy',
        Clear: 'bg-sunny',
        Snow: 'bg-snow',
        Rain: 'bg-rain',
        Drizzle: 'bg-rain',
        Thunderstorm: 'bg-snow',
        Haze: 'bg-snow',
        Default: 'bg-sunny'
    }

    const bgImg = [sydney, shanghai, newYork, london];

    const handleCityClickChange = (cityName) => {
        onCitySelect(cityName);
    }

    useEffect(() => {

        setLoading(true);

        const fetchCitiesWeather = async () => {
            const weatherPromises = searchHistory.map(city => getWeather(city));
            try {
                const weatherData = await Promise.all(weatherPromises);
                const fourCitiesWeatherData = weatherData.map((cityData, index) => ({
                    name: cityData.name,
                    tempRange: { minTemp: Math.round(cityData.main.temp_min), maxTemp: Math.round(cityData.main.temp_max) },
                    weatherIcon: weatherIcons[cityData.weather[0].main] || weatherIcons.Default,
                    bgColor: bgColors[cityData.weather[0].main] || bgColors.Default,
                    bgImg: bgImg[index % bgImg.length] 
                }));
                setCitiesWeather(fourCitiesWeatherData);
            } catch (error) {
                console.error("Error fetching cities weather data:", error);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        fetchCitiesWeather();

    }, [searchHistory]);

    if (loading && initialLoad) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-initial items-center w-full h-full px-4 space-x-6">
            {citiesWeather.map((city, index) => 
                <City 
                    key={index}
                    imgUrl={city.weatherIcon}
                    nameValue={city.name}
                    tempValue={city.tempRange}
                    bgColor={city.bgColor}
                    bgImg={city.bgImg}
                    onClick={() => {handleCityClickChange(city.name)}}
                />
            )}
        </div>
    )
}

export default SearchHistory