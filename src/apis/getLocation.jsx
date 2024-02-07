import axios from "axios";

const API_KEY = "5d50cb77a4d850371ce5a430e31c9b24";

const getLocation = async ( cityName ) => {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching location data: ", error);
        throw error;
    }
}
 
export default getLocation;