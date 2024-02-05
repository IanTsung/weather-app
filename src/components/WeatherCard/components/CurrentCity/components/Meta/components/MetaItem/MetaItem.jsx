import WeatherImage from "../../../WeatherImage"

const MetaItem = ({ imageUrl, alt, value }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <WeatherImage imageUrl={imageUrl} alt={alt} className="w-6 h-6"/>
            {value}
        </div>
    )
}

export default MetaItem