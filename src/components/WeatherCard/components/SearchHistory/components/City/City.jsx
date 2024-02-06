import WeatherIcon from "../../../../../WeatherIcon";
import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange"

const City = ({ nameValue, tempValue, imgUrl, className, onClick }) => {
    return (
        <div className={`flex flex-col items-center justify-center rounded-3xl w-1/4 py-2 space-y-2 shadow-md ${className} 
            cursor-pointer transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl`}
            onClick={() => onClick(nameValue)}>
            <WeatherIcon imageUrl={imgUrl} className="w-12 h-12"/>
            <Name value={nameValue} className="text-xl font-bold"/>
            <TemperatureRange value={tempValue} className="text-sm"/>
        </div>
    )
}

export default City