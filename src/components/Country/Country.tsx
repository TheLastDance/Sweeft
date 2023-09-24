import './Country.css';
import Search from './Search/Search';
import Info from './Info/Info';
import { ICountryProps } from '../../types/types';


const Country: React.FC<ICountryProps> = (props) => {
  const { country, handleCountry } = props;

  return (
    <div className='country'>
      <Search country={country} handleCountry={handleCountry} />
      {country && <Info country={country} />}
    </div>
  )
}

export default Country;