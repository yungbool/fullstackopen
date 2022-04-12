import Weather from './Weather'

export default function CountryDetail( { country } ) {
  return (
    <div>
      <h1>{ country.name.common }</h1>
      <div>
        capital { country.capital[0] }
      </div>
      <div>
        area { country.area }
      </div>
      <div>
        <h2>languages:</h2>
        <ul>
          { Object.values(country.languages)
              .map( (language, index) => <li key={index}>{language}</li> )}
        </ul>
      </div>
      <div id="flag">
        <img src={ country.flags.svg } alt={ country.name } border='1px' width='400px'></img>
      </div>
      <Weather country= { country } />
    </div>
  )
}
