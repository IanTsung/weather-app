import React from "react"
import BackgroundImage from "./components/BackgroundImage"
import WeatherCard from "./components/WeatherCard"
import bg from "./assets/bgImage.jpg"

function App() {
  return (
    <BackgroundImage imageUrl={bg} alt="cloud" className={"h-screen bg-cover flex items-center font-alimama"}>
      <WeatherCard />
    </BackgroundImage>
  );
}

export default App