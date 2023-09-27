import './Airports.css'
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CountryContext } from '../../../../context/CountryListProvider';
import { useRequest } from '../../../../customHooks/useRequest';
import { IAirports } from '../../../../types/types';
import { LoadingOverlay } from '../../../LoadingOverlay/LoadingOverlay';

const Airports = () => {
  const { data } = useContext(CountryContext);
  const { country } = useParams();
  const [airportName, setAirportName] = useState('');
  const [cca2, setCca2] = useState('');
  const [isTimerExpired, setIsTimerExpired] = useState('');
  const header = { headers: { 'X-Api-Key': 'u/rWel6lrDOQL4vZ3WYqJA==fW7yFSupKPJi0eiQ' } }
  const { response, isLoading } = useRequest<IAirports[], string>(
    [cca2, isTimerExpired], `https://api.api-ninjas.com/v1/airports?country=${cca2}&name=${airportName}`, cca2, `${updateCode(country)}-${airportName}`, header
  );

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setAirportName(e.target.value);
  }

  function updateCode(country: string | undefined) {
    const matchingCountry = data.find((item) => item.name.common === country);
    const code = matchingCountry ? matchingCountry.cca2 : '';

    return code;
  }

  useEffect(() => {
    setCca2(updateCode(country));
  }, [data, country])

  //debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsTimerExpired(airportName);
    }, 500);

    return () => clearTimeout(timerId);
  }, [airportName, 500])

  return (
    <div className='airports'>
      <h1>Airports</h1>
      <div className='airports_input'>
        <label>
          <input type="text" placeholder='Search for airport' value={airportName} onChange={(e) => handleName(e)} />
        </label>
      </div>
      <ul className='airports_list'>
        {response ? response.filter(item => item.iata).map((item, index) => <li key={index} >
          {`${item.iata} - ${item.name} (${item.city})`}
        </li>) : null}
      </ul>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  )
}

export default Airports;