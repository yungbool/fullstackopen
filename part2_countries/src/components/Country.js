export default function Country( { country, setFilter } ) {
  const onClick = () => {
    setFilter(country.name.common)
  };

  return (
    <div>
      <div>{ country.name.common }</div>
      <button onClick={ onClick }>show</button>
    </div>
  )
}
