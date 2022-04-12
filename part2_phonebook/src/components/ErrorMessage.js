export default function Status({ status, setStatus }) {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBotton: 10,
  }

  const newStatus = (status) => {
    setTimeout( () => setStatus(''), 5000 ); // Set to no status after timeout
    return status;
  }

  return (
    <div style={style}>
      { newStatus(status) }
    </div>
  )
}
