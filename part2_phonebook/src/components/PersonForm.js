import { useState } from 'react';

export default function PersonForm({ persons,  createPerson, updatePerson }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const scanName = (e) => setNewName(e.target.value);
  const scanNumber = (e) => setNewNumber(e.target.value); 

  const addNewPerson = (e) => {
    e.preventDefault();
    const existing = persons.find( (person) => person.name === newName );
    const id = persons.length > 0 ? persons[persons.length - 1].id + 1 : 0;
    const newPerson = {
      name: newName,
      number: newNumber,
      id: id,
    };
    if ( existing ) {
      const confirm = window.confirm(`${existing.name} is already added to the phonebook, replace ${existing.name}'s number?`);

      if (confirm) {
        updatePerson(existing.id, { ...newPerson, id: existing.id });
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    createPerson(newPerson);
    setNewName('');
    setNewNumber('');
  }

  return (
    <form onSubmit={ addNewPerson }>
      <div>name: <input value={ newName } onChange={ scanName }/></div>
      <div>number: <input value={ newNumber } onChange={ scanNumber }/></div>
      <div>
        <button type="submit">add</button>          
      </div>
    </form>
  ) 
}
