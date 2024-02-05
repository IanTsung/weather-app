const TemperatureRange = ({ value, className, loading}) => {
    return (
        <div className={className}>
            {loading? "loading..." : `${value}°`}
        </div>
    )
}

export default TemperatureRange