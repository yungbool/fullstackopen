const mongoose = require('mongoose')

const argLen = process.argv.length

if (!(argLen === 5 || argLen === 3)) {
  console.log(argLen)
  console.log('Usage: node mongo.js <password> [Name] [Number]')
  process.exit(1)
}

const user = 'mongo-user108'
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://${user}:${password}@cluster0.8u3zh.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const main = () => {
  if (argLen === 3) {
    Person
      .find({})
      .then(result => {
        console.log('phonebook:')
        result.forEach( person =>
          console.log(`${person.name} ${person.number}`) )
        mongoose.connection.close()
      })
  }
  else if (argLen === 5) {
    const person = new Person({
      name: `${name}`,
      number: `${number}`
    })

    person
      .save()
      .then( () => {
        console.log(`added ${name} number ${number} to phonebook.`)
        mongoose.connection.close()
      })
  }
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected')
    main()
  })
  .catch((err) => console.error(err))


/*
noteSchema.set('toJSON', {
  transform: ( document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

note.save().then(result => {
  console.log('note saved!');
  mongoose.connection.close();
})
*/


