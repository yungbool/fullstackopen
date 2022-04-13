const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
});

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body');
const PORT = (process.env.PORT || 3001);

app.use(logger);

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => {
  const min = Math.ceil(1);
  const max = Math.floor(1e6);
  return Math.floor(Math.random() * (max - min) + min);
}


app.get('/api/persons/', (_, res) => {
  res.json(persons);
})

app.get('/info/', (_, res) => {
  const body = `
  <div>Phonebook has info for ${persons.length} people</div>
  <div>${new Date()}</div>
  `;
  res.send(body);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) 
    res.json(person);
  else
    res.status(404).end();
})


app.post('/api/persons/', (req, res) => {
  const body = req.body;
  const errorHandler = (error) => {
    res.status(error.code).json({
      error: error.text
    }) 
  }

  if (!body.name) {
    return errorHandler({
      code: 400,
      text: 'Name missing'
    });
  }
  else if (!body.number) {
    return errorHandler({
      code: 400,
      text: 'Number missing'
    });
  } else if (persons.find(person => person.name === body.name)){
    return errorHandler({
      code: 400,
      text: 'name must be unique'
    });
  }

  const person = { 
    "id": generateId(),
    "name": body.name, 
    "number": body.number,
  };
  
  persons = persons.concat(person);
  console.log( person );

  res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (!person) {
    res.status(404).end()
  } else {
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
  }
})

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
