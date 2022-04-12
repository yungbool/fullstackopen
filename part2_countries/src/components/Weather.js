import { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY;
const api_url = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`; 
const icon_url = (icon) => `https://openweathermap.org/img/wn/${icon}.png`; 

export default function Weather({ country }) {
  const [ temp, setTemp ] = useState(0);
  const [ wind, setWind ] = useState(0);
  const [ icon, setIcon ] = useState('');
  const [ description, setDescription] = useState('');

  const getData = () => {
    const [lat, lon] = [country.latlng[0], country.latlng[1]] 
    fetch(api_url(lat , lon))
      .then( response => response.json() )
      .then( data => {
        setTemp(data.main?.temp);
        setWind(data.wind?.speed);
        setIcon(data.weather?.[0].icon);
        setDescription(data.weather?.description);
      })
  }

  useEffect(getData);

  return (
    <div>
      <h1>Weather in { country.name.common }</h1>
      <div id='temperature'>temperature { temp } celsius</div>
      <div id='icon'>
        <img src={ icon_url(icon) } alt={ description }></img>
      </div>
      <div id='wind'>wind { wind } m/s </div>
    </div>
  )
}
