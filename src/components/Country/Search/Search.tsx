import { useState } from 'react';
import './Search.css';
import { ICountryProps, ICountryName } from '../../../types/types';
import { useRequest } from '../../../customHooks/useRequest';
import OutsideClickHandler from 'react-outside-click-handler';

const Search: React.FC<ICountryProps> = (props) => {
  const { country, handleCountry } = props;
  const { response } = useRequest<ICountryName[]>('https://restcountries.com/v3.1/all?fields=name,flags');
  const [dropMenu, setDropMenu] = useState(false);

  console.log(response);

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setDropMenu(false)}>
        <div tabIndex={0} className='search' onClick={() => setDropMenu(prev => !prev)}>
          {country ? <p>{country}</p> : <p>Choose the country</p>}
        </div>
        {dropMenu ? <ul className='drop-menu'>
          {response.map((item, index) => <li key={index} onClick={() => { handleCountry(item.name.common); setDropMenu(false) }}>
            <p>{item.name.common}</p>
            <img src={item.flags.svg} alt={item.flags.alt} />
          </li>)}
        </ul> : null}
      </OutsideClickHandler>
    </>
  )
}

export default Search;