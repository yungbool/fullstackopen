import { useState, useEffect } from 'react';
import Search from './components/Search';
import Result from './components/Result';


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const getData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then( response => response.json() )
      .then( data => setCountries(data) )
  }

  useEffect(getData, []);

  return (
    <>
      <div>
        <Search filter={ filter } setFilter={ setFilter }/>
      </div>
      <div>
        <Result countries={ countries } filter={ filter } setFilter={ setFilter }/>
      </div>
    </>
  );
}

export default App;
