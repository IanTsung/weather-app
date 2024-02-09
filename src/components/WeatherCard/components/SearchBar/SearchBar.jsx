import { useState } from "react"
import getLocation from "../../../../apis/getLocation"

const SearchBar = ({ onSearch }) => {

    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const locations = await getLocation(value);
            setOptions(locations); 
        } else {
            setOptions([]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedCity) {
            onSearch(`${selectedCity.name}, ${selectedCity.state ? `${selectedCity.state}, ` : ''}${selectedCity.country}`);
        } else if (inputValue.trim()) {
            onSearch(inputValue.trim());
        }

        setInputValue("");
        setOptions([]);
        setSelectedCity(null);
    }

    const handleOptionClick = (city) => {
        setInputValue(`${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`);
        setSelectedCity(city);
        setOptions([]);
    }

    return (
        <div className="flex justify-start items-center mt-2">
            <form className="flex justify-between rounded-2xl p-1 bg-slate-50 w-1/2" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="px-4 py-2 outline-none w-full bg-slate-50" 
                    placeholder="Search for a city"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button 
                    type="submit"
                    className="flex items-center justify-center rounded-2xl border-none px-5 bg-[#5d4dde] text-white"
                >
                    Search
                </button>
                {options.length > 0 && (
                    <ul className="absolute mt-12 bg-white border border-gray-200 rounded-md w-1/4 z-10">
                        {options.map((city, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 w-full"
                                onClick={() => handleOptionClick(city)}
                            >
                                {`${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    )
}

export default SearchBar