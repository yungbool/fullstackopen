const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return fetch(baseUrl);
}

const create = ( newObject ) => {
  return fetch(baseUrl, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  }).then(response => {
    if (!response.ok) 
      throw new Error(response.status);
    return response;
  })
}

const update = ( id, newObject ) => {
  return fetch(`${baseUrl}/${id}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  }).then(response => {
    console.log(response);
    if (!response.ok) 
      throw new Error(response.status);
    return response;
  })
}

const remove = ( id ) => {
  return fetch(`${baseUrl}/${id}`, { 
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) 
      throw new Error(response.status);
    return response;
  })
}

const NoteService = { getAll, create, update, remove };

export default NoteService;
