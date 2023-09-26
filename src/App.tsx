import './App.css'
import Country from './components/Country/Country';
import CountryNavigate from './components/Country/CountryNavigate';
import { Route, Routes } from 'react-router-dom';
import CountryListProvider from './context/CountryListProvider';

function App() {

  return (
    <main>
      <CountryListProvider>
        <Routes>
          <Route path='/*' element={<CountryNavigate />} ></Route>
          <Route path=':country/*' element={<Country />} ></Route>
        </Routes>
      </CountryListProvider>
    </main>
  )
}

export default App
