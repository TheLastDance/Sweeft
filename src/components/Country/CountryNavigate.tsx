import './Country.css';
import { useState, useEffect } from 'react';
import Search from './Search/Search';
import { useParams, Navigate } from 'react-router-dom';


const CountryNavigate: React.FC = () => {
  const { country } = useParams();
  const [address, setAddress] = useState("");
  const [geolocation, setGeolocation] = useState<[number, number] | []>([]);

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
  //       .then(json => setAddress(json.results[0].formatted_address));
  //   }
  // }, [geolocation])

  // console.log(country);

  return (
    <div className='country'>
      <Search country={country} />
      {address && <Navigate to={`/${address}`}></Navigate>}
    </div>
  )
}

export default CountryNavigate;