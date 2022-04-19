const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const user = process.argv[2];
const password = process.argv[3];

const url =
`mongodb+srv://${user}:${password}@cluster0.8u3zh.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: ( document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Note = mongoose.model('Note', noteSchema);

/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
}) 

note.save().then(result => {
  console.log('note saved!');
  mongoose.connection.close();
})
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close()
});

