import { useState, useEffect } from "react"
import Icon from "./Icon"
import Description from "./Description"
import Temperature from "./Temperature"
import Humidity from "./Humidity"

const Weather = ({ city }) => {
  const [conditions, setConditions] = useState({})
  const [description, setDescription] = useState("")
  const [iconID, setIconID] = useState("")
  const [location, setLocation] = useState("")
  const {mainTemp, feelsLike, humidity} = conditions
  const [apiCallsOut, setApiCallsOut] = useState(0)

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER}&units=metric&lang=fr`
    fetch(url)
      .then((response) => {
        setApiCallsOut (a => a + 1)
        if (!response.ok) {
          throw new Error("météo untrouvable")
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setLocation(`${data.name}, ${data.sys.country}`)
        setConditions({
          feelsLike: Math.round(data.main.feels_like),
          mainTemp: Math.round(data.main.temp),
          humidity: data.main.humidity
        })
        setDescription(data.weather[0].description)
        setIconID(data.weather[0].icon)
        setLocation(`${data.name}, ${data.sys.country}`)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [city])
  return (
    <>
      {!!location && (
        <section className="text-center">
          <Icon iconID={iconID} />
          <h2 className="mb-4">Conditions météo à {location}</h2>
          <Description description={description} />
          <Temperature mainTemp={mainTemp} feelsLike={feelsLike} />
          <Humidity humidity={humidity} />
          <p>Vous avez fait {apiCallsOut} appels à l'API OpenWeatherApp</p>
        </section>
      )}
    </>
  )
}

export default Weather