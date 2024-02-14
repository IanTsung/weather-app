import React from "react";
import Name from "../../../../../Name";
import Date from "../../../../../Date"
import WeatherIcon from "../../../../../WeatherIcon";
import TemperatureRange from "../../../../../TemperatureRange";

const DayOfWeek = ({ nameValue, dateValue, tempValue, imgUrl }) => {
    return (
        <div className="w-1/4 h-full flex flex-col items-center justify-center">
            <Name value={nameValue} className={"font-bold text-lg lg:text-xl"}/>
            <Date value={dateValue}/>
            <WeatherIcon imageUrl={imgUrl}/>
            <TemperatureRange minTemp={tempValue.minTemp} maxTemp={tempValue.maxTemp}/>
        </div>
    )
}

export default DayOfWeek