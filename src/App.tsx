import './App.css'
import { useState, useEffect } from 'react'
import Country from './components/Country/Country';

function App() {
  const [country, setCountry] = useState("");
  const [geolocation, setGeolocation] = useState<[number, number] | []>([]);

  const handleCountry = (name: string): void => {
    setCountry(name);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      setGeolocation([pos.coords.latitude, pos.coords.longitude]),
      error => console.log("Error: ", error),
      { enableHighAccuracy: true });
  }, [])

  // useEffect(() => {
  //   if (geolocation.length) {
  //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation[0]},${geolocation[1]}&language=en&result_type=country&key=AIzaSyA8rKgPjyEmViIFZdedrXWPBxRq351t71Y`)
  //       .then(res => res.json())
  //       .then(json => setCountry(json.results[0].formatted_address))
  //   }
  // }, [geolocation])

  console.log(geolocation, country);


  return (
    <main>
      <Country country={country} handleCountry={handleCountry} />
    </main>
  )
}

export default App
