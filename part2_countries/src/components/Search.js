export default function Search({ filter, setFilter }) {
  const onChange = (e) => setFilter(e.target.value);

  return (
    <div>find countries <input value={ filter } onChange={ onChange }/></div>
  )
}
