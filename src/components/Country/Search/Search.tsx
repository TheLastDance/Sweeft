import { useState } from 'react';
import './Search.css';
import { ICountryProps, ICountryName } from '../../../types/types';
import { useRequest } from '../../../customHooks/useRequest';
import OutsideClickHandler from 'react-outside-click-handler';
import arrow_up from '../../../assets/arrow-up.svg';
import arrow_down from '../../../assets/arrow-down.svg';

const Search: React.FC<ICountryProps> = (props) => {
  const { country, handleCountry } = props;
  const { response } = useRequest<ICountryName[]>([], 'https://restcountries.com/v3.1/all?fields=name,flags');
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setDropMenu(false)}>
      <div className='search_container'>
        <div tabIndex={0} className='search' onClick={() => setDropMenu(prev => !prev)}>
          {country ? <p>{country}</p> : <p>Choose the country</p>}
          {dropMenu ? <img src={arrow_up} alt="arrow-up icon" /> : <img src={arrow_down} alt="arrow-down icon" />}
        </div>
        {dropMenu ? <ul className='drop-menu'>
          {response
            .sort(((a, b) => a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1))
            .map((item, index) => <li key={index} onClick={() => { handleCountry(item.name.common); setDropMenu(false) }}>
              <p>{item.name.common}</p>
              <img src={item.flags.svg} alt={item.flags.alt} />
            </li>)}
        </ul> : null}
      </div>
    </OutsideClickHandler>
  )
}

export default Search;