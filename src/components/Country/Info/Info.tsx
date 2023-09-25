import './Info.css';
import { useContext } from 'react';
import { ICountryProps, ICountryData } from '../../../types/types';
import { useRequest } from '../../../customHooks/useRequest';
import { LoadingOverlay } from '../../LoadingOverlay/LoadingOverlay';
import { CountryContext } from '../../../context/CountryListProvider';

const Info: React.FC<Pick<ICountryProps, "country">> = ({ country }) => {
  const url = `https://restcountries.com/v3.1/name/${country}?fields=name,flags,borders,cca3,capital,region,currencies,languages,subregion,demonyms,population,tld,area&fullText=true`;
  const { response, isLoading } = useRequest<ICountryData[]>([country], url, country);
  const { data } = useContext(CountryContext);

  console.log(response, isLoading, data);


  return (
    <>
      {response.map(item => <div className="country_info" key={item.name.common}>
        <div className='country_info_main'>
          <h1>{item.name.common}</h1>
          <img src={item.flags.svg} alt={item.flags.alt} />
        </div>
        <div className="country_info_2">
          <ul className="country_info_2_left">
            <li className="p-info">Native name: <span>{item.name.nativeName.common ? item.name.nativeName[Object.keys(item.name.nativeName)[0]].common : null}</span></li>
            <li className="p-info">Population: <span>{item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></li>
            <li className="p-info">Region: <span>{item.region}</span></li>
            <li className="p-info">Sub Region: <span>{item.subregion}</span></li>
            <li className="p-info">Capital: <span>{item.capital ? item.capital.join(", ") : null}</span></li>
          </ul>
          <ul className="country_info_2_right">
            <li className="p-info">Area: <span>{`${item.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km2`}</span> </li>
            <li className="p-info">Demonym: <span>{item.demonyms ? item.demonyms.eng.m : null}</span> </li>
            <li className="p-info">Top Level Domain: <span>{item.tld ? item.tld.join(", ") : null}</span></li>
            <li className="p-info">Currencies: <span>{item.currencies ? Object.keys(item.currencies)
              .map(item2 => item.currencies[item2].symbol ? `${item.currencies[item2].name} - ${item.currencies[item2].symbol}` : item.currencies[item2].name).join(", ") : 'no'}</span></li>
            <li className="p-info">Languages: <span>{item.languages ? Object.values(item.languages).join(", ") : 'no'}</span></li>
          </ul>
        </div>
        {item.borders.length ? <div className="border_countries">
          <span>Border Countries: {item.borders.map(item => <span key={item} >
            {item},
          </span>)}
          </span>
        </div> : null}
      </div>)}
      <LoadingOverlay isVisible={isLoading} />
    </>
  )
}

export default Info;