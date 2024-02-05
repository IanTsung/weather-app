import axios from "axios";

const API_KEY = "5d50cb77a4d850371ce5a430e31c9b24";

const getWeather = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        throw error;
    }
};

export default getWeather;