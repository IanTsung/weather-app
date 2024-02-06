import { useState, useEffect } from 'react'
import CurrentCity from "./components/CurrentCity"
import Forecast from "./components/Forecast"
import SearchHistory from './components/SearchHistory'
import SearchBar from "./components/SearchBar"
import moment from 'moment'

const WeatherCard = () => {

    const [cityName, setCityName] = useState("Sydney");
    const [searchHistory, setSearchHistory] = useState(["Sydney", "Shanghai", "New York", "London"]);
    const [currentTime, setCurrentTime] = useState('');

    const handleCityChange = (newCity) => {
        setCityName(newCity);
        setSearchHistory(prev => [newCity, ...prev.filter(city => city !== newCity).slice(0, 3)]);
    }

    useEffect(() => {

        const updateDateTime = () => {
            setCurrentTime(moment().format("DD MMM, dddd hh:mm a"));
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-4/5 h-4/5 mx-auto rounded-3xl bg-[#f2f4fd] overflow-hidden shadow-blue-800 grid grid-cols-6 grid-rows-6">
            <div className="row-span-6 col-span-2 m-6 rounded-3xl relative" 
                style={{
                    backgroundImage:
                    "linear-gradient(152deg, #899bf0 1%, #3f55e4 54%, #3f55e4 96%)"
                }}>
                <CurrentCity cityName={cityName} currentTime={currentTime}/>
            </div>
            <div className="row-span-3 col-span-4 my-6 mx-auto">
                <Forecast cityName={cityName}/>
            </div>
            <div className="row-span-1 col-span-4 m-8">
                <SearchBar onSearch={handleCityChange}/>
            </div>
            <div className="row-span-2 col-span-4 m-6 flex items-end">
                <SearchHistory searchHistory={searchHistory}/>
            </div>
        </div>
    )
}

export default WeatherCard