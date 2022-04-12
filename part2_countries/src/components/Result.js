import Country from './Country'
import CountryDetail from './CountryDetail'

export default function Result( { countries, filter, setFilter } ) {
  const render = () => {
    let result = countries.filter( (country) => country.name.common?.toLowerCase().includes(filter.toLowerCase()) );
    if (result.length < 1) {
      return null;
    }
    if (result.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } 
    if (result.length > 1) {
      return (
        <div>
          { 
            result.map((country, id) =>
              <Country country={ country } key={ id } setFilter={ setFilter }/>) 
          }
        </div>
      )
    } 
    if (result.length === 1) {
      let country = result[0];
      return (
        <CountryDetail country={ country }/>
      )
    } 
  };
    
  return (render());
}
