const TemperatureRange = ({ minTemp, maxTemp, className }) => {
    return (
        <div className={className}>
            {`${minTemp} ~ ${maxTemp}°`}
        </div>
    )
}

export default TemperatureRange