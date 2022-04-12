import Person from './Person';

export default function Numbers ({ persons, filter, deletePerson }) {
  const filterNames = (person) => {
    if (filter.length === 0) {
      return true;
    } else if (person.name.toLowerCase().includes(filter.trim())){
      return true;
    } else {
      return false;
    }
  };

  const delPerson = (person) => (() => deletePerson(person));
  

  return (
    <div>
      { persons.filter(filterNames).map( (person) =>  
        <Person name={person.name} number={person.number} deletePerson={ delPerson(person) } key={person.id}/>) }
    </div>
  )
}
