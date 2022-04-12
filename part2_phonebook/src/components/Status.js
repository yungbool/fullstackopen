import { useEffect } from 'react';

export default function Status({ status, statusType, setStatus }) {
  const delay = 5000;
  
  const style = () => {
    if (status.length < 1) {
      return { 
        display: 'none',
      }
    } else {
      return {
        color: statusType === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBotton: 10,
      };
    }
  };

  const newStatus = () => {
    const id = setTimeout( () => setStatus('') , delay); // Set to no status after timeout
    return () => {
      clearTimeout(id)
    }
  };

  useEffect(newStatus, [status, setStatus]); 

  return (
    <div style={ style() }>
      { status }
    </div>
  )
}
