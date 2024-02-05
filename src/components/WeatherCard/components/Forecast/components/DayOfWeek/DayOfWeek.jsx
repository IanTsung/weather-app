import React from "react";
import Name from "../../../../../Name";
import Date from "../../../../../Date"
import WeatherIcon from "../../../../../WeatherIcon";
import TemperatureRange from "../../../../../TemperatureRange";

const DayOfWeek = ({ nameValue, dateValue, tempValue, imgUrl }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Name value={nameValue} className={"font-bold text-1xl"}/>
            <Date value={dateValue}/>
            <WeatherIcon imageUrl={imgUrl}/>
            <TemperatureRange value={tempValue}/>
        </div>
    )
}

export default DayOfWeek