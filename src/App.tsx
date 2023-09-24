import './App.css'
import { useState, useEffect } from 'react'
import Country from './components/Country/Country';

//https://maps.googleapis.com/maps/api/geocode/json?latlng=41.6959,44.832&language=en&result_type=country&key=AIzaSyA8rKgPjyEmViIFZdedrXWPBxRq351t71Y
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
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint accusamus ullam laudantium atque, quasi deleniti repudiandae. Non maiores nostrum sint, unde saepe id ipsum iure commodi quod, beatae magnam eos.
      Itaque dolorem officia repellat sunt aut deserunt ex alias repellendus eos accusantium natus, vero quidem autem dolorum laborum nemo? Quis nisi optio tenetur placeat expedita totam voluptate nam perspiciatis! Laborum?
      Sapiente animi a laborum nulla. Similique, nostrum unde quod odio facere laudantium praesentium culpa obcaecati consequatur atque temporibus mollitia aperiam fuga ex officiis quo suscipit quos neque nihil ullam dolorem.
      Quo libero unde itaque amet omnis. Nisi, esse! Autem totam similique et quaerat eligendi facilis in nihil tenetur incidunt sapiente delectus veritatis consectetur ipsam id corrupti explicabo quo, praesentium officia.
      Possimus id quae vel repellat? Optio voluptates soluta, laborum quos molestiae hic voluptatibus veritatis officiis ex, quas iusto nam est? Quasi neque id itaque possimus, tempora cum cupiditate autem illo!
    </main>
  )
}

export default App
