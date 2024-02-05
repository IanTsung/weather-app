const WeatherIcon = ({ imageUrl, alt = "weather icon", className }) => {
    return (
        <img src={imageUrl} alt={alt} className={className}/>
    )
}

export default WeatherIcon