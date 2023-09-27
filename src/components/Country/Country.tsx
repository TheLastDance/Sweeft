import './Country.css';
import Search from './Search/Search';
import Info from './Info/Info';
import Features from './Features/Features';
import { useParams, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';


const Country: React.FC = () => {
  const { country } = useParams();
  const location = useLocation();

  return (
    <div className='country'>
      <ErrorBoundary
        fallback={<p>Country provided in url does not exist, please check url address!</p>}
        resetKeys={[location]}
      >
        <Search country={country} />
        <Info country={country} />
        <Features />
      </ErrorBoundary>
    </div>
  )
}

export default Country;