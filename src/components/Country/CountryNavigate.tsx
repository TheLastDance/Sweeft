import './Country.css';
import { useState, useEffect } from 'react';
import Search from './Search/Search';
import Features from './Features/Features';
import { useParams, Navigate } from 'react-router-dom';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { useRequest } from '../../customHooks/useRequest';
import { ICountryNavigate } from '../../types/types';


const CountryNavigate: React.FC = () => {
  const { country } = useParams();
  const [geolocation, setGeolocation] = useState<[number, number] | []>([]);
  const { response, isLoading } = useRequest<ICountryNavigate, [] | [number, number]>(
    [geolocation],
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation[0]},${geolocation[1]}&language=en&result_type=country&key=AIzaSyA8rKgPjyEmViIFZdedrXWPBxRq351t71Y`,
    geolocation.length
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      setGeolocation([pos.coords.latitude, pos.coords.longitude]),
      error => console.log("Error: ", error),
      { enableHighAccuracy: true });
  }, [])

  return (
    <div className='country'>
      <Search country={country} />
      {!Array.isArray(response) && <Navigate to={`/${response.results[0].formatted_address}`}></Navigate>}
      <Features />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  )
}

export default CountryNavigate;