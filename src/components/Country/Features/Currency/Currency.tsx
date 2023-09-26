import './Currency.css';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../Search/Search';
import { ICountryName, IExchangeRate } from '../../../../types/types';
import { CountryContext } from '../../../../context/CountryListProvider';
import { useRequest } from '../../../../customHooks/useRequest';

const Currency: React.FC = () => {
  const { data } = useContext(CountryContext);
  const { country } = useParams();
  const [currencyCountry, setCurrencyCountry] = useState(country);
  const [currency, setCurrency] = useState('');
  const { response, isLoading } = useRequest<IExchangeRate[], string>([currency], `https://api.exchangerate.host/latest?base=${currency}`, true, currency);

  function handleCurrency(item: ICountryName) {
    setCurrencyCountry(item.name.common)
  }

  function updateCurrencyCode(country: string | undefined) {
    const matchingCountry = data.find((item) => item.name.common === country);
    const code = matchingCountry ? Object.keys(matchingCountry.currencies)[0] : '';

    return code;
  }

  useEffect(() => {
    setCurrency(updateCurrencyCode(country))
  }, [data, country, currencyCountry])

  console.log(country, currencyCountry, currency, response);


  return (
    <div className='currency'>
      <h1>Currency Exchange</h1>
      <Search country={country} currencyCountry={currencyCountry} handleCurrency={handleCurrency} />
    </div>
  )
}

export default Currency;