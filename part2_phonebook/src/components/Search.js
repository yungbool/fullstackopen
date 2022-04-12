export default function Search({ filter, setFilter }) {
  const onChange = (e) => setFilter(e.target.value);

  return (
    <div>
      filter shown with <input value={filter} type="text" onChange={ onChange }/>
    </div>
  )
}
