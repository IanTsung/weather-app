import axios from "axios";

const API_KEY = "5d50cb77a4d850371ce5a430e31c9b24";

const getAirQuality = async (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        throw error;
    }
};

export default getAirQuality;