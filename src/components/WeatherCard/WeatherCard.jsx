import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentCity from "./components/CurrentCity"
import Forecast from "./components/Forecast"
import SearchHistory from './components/SearchHistory'
import SearchBar from "./components/SearchBar"
import moment from 'moment'
import getWeather from '../../apis/getWeather'

const WeatherCard = () => {

    const [cityName, setCityName] = useState("Sydney");
    const [searchHistory, setSearchHistory] = useState(["Sydney", "Shanghai", "New York", "London"]);
    const [currentTime, setCurrentTime] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("");

    const handleCityChange = async (newCity) => {
        try {
            const data = await getWeather(newCity);
            setCityName(newCity);
            setSearchHistory(prev => [data.name, ...prev.filter(city => city !== data.name).slice(0, 3)]);
        } catch (error) {
            toast.error("City Name Not Valid", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Error fetching data: ", error);
        }    
    }

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

    useEffect(() => {

        const updateDateTime = () => {
            setCurrentTime(moment().format("DD MMM, dddd hh:mm a"));
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getWeather(cityName);
                setWeatherCondition(data.weather[0].main);
            } catch (error) {
                console.error("Error fetching weather condition data:", error);
            }
        };

        fetchWeather();
    }, [cityName]);

    const bgColor = bgColors[weatherCondition] || bgColors.Default;

    return (
        <div className="w-4/5 h-4/5 mx-auto rounded-3xl bg-[#f2f4fd] overflow-auto lg:overflow-hidden shadow-blue-800 grid grid-cols-1 grid-rows-13 lg:grid-cols-6 lg:grid-rows-6 ">
            <div className={`row-span-6 col-span-1 lg:col-span-2 m-6 rounded-3xl relative ${bgColor}`}>
                <CurrentCity cityName={cityName} currentTime={currentTime}/>
            </div>
            <div className="row-span-3 col-span-1 lg:col-span-4 my-6 mx-auto">
                <Forecast cityName={cityName}/>
            </div>
            <div className="row-span-1 col-span-1 lg:col-span-4 ml-8 ">
                <SearchBar onSearch={handleCityChange}/>
            </div>
            <div className="row-span-2 col-span-1 lg:col-span-4 m-6 flex items-end">
                <SearchHistory searchHistory={searchHistory} onCitySelect={handleCityChange}/>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default WeatherCard