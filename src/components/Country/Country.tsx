import './Country.css';
import Search from './Search/Search';
import { ICountryProps } from '../../types/types';


const Country: React.FC<ICountryProps> = (props) => {
  const { country, handleCountry } = props;

  return (
    <div className='country'>
      <Search country={country} handleCountry={handleCountry} />
    </div>
  )
}

export default Country;