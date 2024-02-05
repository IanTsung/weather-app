import axios from "axios";

const API_KEY = "5d50cb77a4d850371ce5a430e31c9b24";

const getForecast = async ( lat, lon ) => {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`;

    try {
        const response = await axios.get(URL);
        return response.data.daily.slice(1, 5);
    } catch (error) {
        console.error("Error fetching forecast data: ", error);
        throw error;
    }
}
 
export default getForecast;