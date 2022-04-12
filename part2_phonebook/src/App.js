import { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Status from './components/Status';
import NoteService from './services/NoteService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  const get = () => {
    NoteService
      .getAll()
      .then(response => response.json())
      .then(persons => setPersons(persons))
      .catch(error => console.error(error))
  };

  const createPerson = ( person ) => {
    NoteService
      .create( person )
      .then(response => response.json())
      .then( data => { 
        setPersons(persons.concat(data));
        setStatusType('success');
        setStatus(`Added ${data.name}`);
      })
      .catch(error => console.error(error))
  }

  const updatePerson = ( id, person ) => {
    NoteService
      .update( id, person )
      .then(response => response.json())
      .then( data => {
        setPersons(persons.map( (p) => p.id === data.id ? data : p ));
        setStatusType('success');
        setStatus(`Updated ${data.name}`);
      }) 
      .catch( () => {
        setStatusType('failed');
        setStatus(`Information of ${person.name} has been removed from the server`);
      })
      .finally(get);
  }

  const deletePerson = ( person ) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (!confirm) {
      return () => {};
    }

    const id = person.id;
    NoteService
      .remove( id )
      .then( () => {
        setPersons(persons.filter( ( person ) => person.id !== id ));
        setStatusType('success');
        setStatus(`Deleted ${person.name}`);
      })
      .catch( () => {
        setStatusType('failed');
        setStatus(`Information of ${person.name} has been removed from the server`);
      })
      .finally(get);
  } 


  useEffect(get, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Status status={ status } setStatus={ setStatus } statusType={ statusType }/>
      <Search filter={ filter } setFilter={ setFilter } />
      <h2>add a new</h2>
      <PersonForm 
        persons={ persons }
        setPersons={setPersons} 
        createPerson={ createPerson }
        updatePerson={ updatePerson }
      />
      <h2>Numbers</h2>
      <Numbers persons={ persons } filter={ filter } deletePerson={ deletePerson }/> 
    </div>
  )
}

export default App
