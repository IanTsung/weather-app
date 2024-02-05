import { useState } from "react"

const SearchBar = ({ onSearch }) => {

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = () => {
        onSearch(inputValue);
        setInputValue("");
    }
    return (
        <div className="flex justify-start items-center mt-2">
            <div className="flex rounded-2xl p-1 bg-slate-50 overflow-hidden">
                <input 
                    type="text" 
                    className="px-4 py-2 w-72 outline-none bg-slate-50" 
                    placeholder="Search for a city"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button 
                    className="flex items-center justify-center rounded-2xl border-none px-5 bg-[#5d4dde] text-white"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchBar