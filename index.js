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

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).send({ error: 'Person id not found' });
      }
    })
    .catch(error => next(error));
})


app.post('/api/persons/', (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    res.status(400).send({ error: 'Name missing' });
    return;
  } else if (!body.number) {
    res.status(400).send({ error: 'Number missing' });
    return;
  } 

  Person
    .exists({
      name: `${body.name}`,
    })
    .then(person => {
      if (person) {
        res.status(400).send({ error: 'Name must be unique' });
      } else {
        const newPerson = new Person({ 
          "name": body.name, 
          "number": body.number,
        });

        newPerson
          .save()
          .then(savedPerson => res.json(savedPerson))
          .catch(error => next(error));
      }
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  const person = new Person({
    "name": body.name,
    "number": body.number,
    _id: id
  })

  Person
    .findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (updatedPerson)
        res.json(updatedPerson)
      else
        next();
    })
    .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount < 1) {
        res.status(404).send({ error: 'Person id not found' });
      } else {
        res.status(204).end();
      }
    })
    .catch(error => next(error));
})

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
