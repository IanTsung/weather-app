import MetaItem from "./components/MetaItem"
import wind from "./assets/wind_speed.svg"
import humidity from "./assets/humidity.svg"
import airQuality from "./assets/PM2.5.svg"
import somatosensory from "./assets/Somatosensory_temperature.svg"

const Meta = ({ humidityValue, windSpeed, airQualityValue, somatosensoryValue }) => {
    return (
        <div className="flex justify-between bg-slate-50 rounded-2xl w-5/6 p-4">
            <MetaItem imageUrl={humidity} alt={"wind icon"} value={`${humidityValue}%`}/>
            <MetaItem imageUrl={wind} alt={"humidity icon"} value={`${windSpeed}km/h`}/>
            <MetaItem imageUrl={airQuality} alt={"air quality icon"} value={`${airQualityValue}μg`}/>
            <MetaItem imageUrl={somatosensory} alt={"somatosensory temp icon"} value={`${somatosensoryValue}°`}/>
        </div>
    )
};

export default Meta