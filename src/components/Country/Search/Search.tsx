import { useState, useContext } from 'react';
import './Search.css';
import { ICountryProps } from '../../../types/types';
import OutsideClickHandler from 'react-outside-click-handler';
import arrow_up from '../../../assets/arrow-up.svg';
import arrow_down from '../../../assets/arrow-down.svg';
import { Link } from "react-router-dom";
import { LoadingOverlay } from '../../LoadingOverlay/LoadingOverlay';
import { CountryContext } from '../../../context/CountryListProvider';

const Search: React.FC<ICountryProps> = (props) => {
  const { country } = props;
  const { data, isLoading } = useContext(CountryContext);
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setDropMenu(false)}>
      <div className='search_container'>
        <div tabIndex={0} className='search' onClick={() => setDropMenu(prev => !prev)}>
          {country ? <p>{country}</p> : <p>Choose the country</p>}
          {dropMenu ? <img src={arrow_up} alt="arrow-up icon" /> : <img src={arrow_down} alt="arrow-down icon" />}
        </div>
        {dropMenu ? <ul className='drop-menu'>
          {data
            .sort(((a, b) => a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1))
            .map((item, index) => <li key={index} onClick={() => { setDropMenu(false) }}>
              <Link to={`/${item.name.common}`}>
                <p>{item.name.common}</p>
                <img src={item.flags.svg} alt={item.flags.alt} />
              </Link>
            </li>)}
        </ul> : null}
      </div>
      <LoadingOverlay isVisible={isLoading} />
    </OutsideClickHandler>
  )
}

export default Search;