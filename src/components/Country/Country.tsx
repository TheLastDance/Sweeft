import './Country.css';
import Search from './Search/Search';
import Info from './Info/Info';
import Features from './Features/Features';
import { useParams } from 'react-router-dom';


const Country: React.FC = () => {
  const { country } = useParams();

  return (
    <div className='country'>
      <Search country={country} />
      <Info country={country} />
      <Features />
    </div>
  )
}

export default Country;