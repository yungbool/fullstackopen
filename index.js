require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

const PORT = (process.env.PORT || 3001);

/* Morgan logger */
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
});

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

/* Express App */
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(logger);

/*
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
*/
const errorHandler = (res, error) => {
  res.status(error.code).json({
    error: error.text
  }) 
}

const generateId = () => {
  const min = Math.ceil(1);
  const max = Math.floor(1e6);
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/api/persons/', (_, res) => {
  Person
    .find({})
    .then(person => {
      res.json(person);
    })
})

app.get('/info/', (_, res) => {
  Person
    .countDocuments({}, ((_, count) => {
      const body = `
      <div>Phonebook has info for ${count} people</div>
      <div>${new Date()}</div>
      `;
      res.send(body);
    }))
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  Person
    .findById(req.params.id)
    .then(person => res.json(person))
    .catch(error => errorHandler(res, {
      code: 404,
      text: 'Person id not found'
    }));
})


app.post('/api/persons/', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return errorHandler(res, {
      code: 400,
      text: 'Name missing'
    });
  } else if (!body.number) {
    return errorHandler(res, {
      code: 400,
      text: 'Number missing'
    });
  } 

  Person
    .exists({
      name: `${body.name}`,
    })
    .then(person => {
      if (person) {
        return errorHandler(res, {
          code: 400,
          text: 'Name must be unique'
        });
      } else {
        const person = new Person({ 
          "name": body.name, 
          "number": body.number,
        });

        person
          .save()
          .then(savedPerson => res.json(savedPerson));
      }
    });
})

app.delete('/api/persons/:id', (req, res) => {
  const id = String(req.params.id);
  Person
    .deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount < 1) {
        return errorHandler(res, {
          code: 404,
          text: 'Person id not found'
        })
      } else {
        res.status(204).end();
      }
  })
})

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
