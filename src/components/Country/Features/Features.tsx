import './Features.css';
import { NavLink, useParams, Routes, Route, useLocation } from 'react-router-dom';
import Currency from './Currency/Currency';
import Airports from './Airports/Airports';
import { ErrorBoundary } from 'react-error-boundary';

const Features: React.FC = () => {
  const { country } = useParams();
  const location = useLocation();

  function handleLink(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (!country) e.preventDefault();
  }

  return (
    <div className='features'>
      <div className='features_links'>
        <NavLink
          to={`/${country}`}
          end
          onClick={handleLink}
          className={({ isActive }) => isActive ? 'features_links_a features_links_a_focus' : 'features_links_a'}
        >
          currency exchange
        </NavLink>
        <NavLink
          to={`/${country}/airports`}
          end
          onClick={handleLink}
          className={({ isActive }) => isActive ? 'features_links_a features_links_a_focus' : 'features_links_a'}
        >
          airports
        </NavLink>
      </div>
      <Routes>
        {country &&
          <Route
            path='/'
            element={
              <ErrorBoundary
                fallback={<p>One of the selected countries doesn't have a currency, please select another country.</p>}
                resetKeys={[location]}
              >
                <Currency />
              </ErrorBoundary>}>
          </Route>}
        <Route path='/airports' element={<Airports />}></Route>
      </Routes>
    </div>
  )
}

export default Features;