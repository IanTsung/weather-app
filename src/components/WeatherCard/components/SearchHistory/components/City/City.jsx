import WeatherIcon from "../../../../../WeatherIcon";
import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange"

const City = ({ nameValue, tempValue, imgUrl, bgColor, bgImg, onClick }) => {
    return (
        <div className={`relative flex flex-col items-center justify-center rounded-3xl w-1/4 h-full lg:h-2/3 py-2 space-y-2 text-white shadow-md ${bgColor}
            cursor-pointer transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl`}
            onClick={() => onClick(nameValue)}>
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-10]"
                style={{ backgroundImage: `url(${bgImg})`, 
                         opacity: 0.25,
                         borderRadius: 'inherit' }}></div>
            <WeatherIcon imageUrl={imgUrl} className="w-12 h-12"/>
            <Name value={nameValue} className="text-sm sm:text-md md:text-lg lg:text-xl font-bold"/>
            <TemperatureRange minTemp={tempValue.minTemp} maxTemp={tempValue.maxTemp} className="text-sm"/>
        </div>
    )
}

export default City