const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    required: false,
  },
  author: {
    type: String,
    minLength: 0,
    required: false,
  },
  url: {
    type: String,
    minLength: 0,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
})

blogSchema.set('toJSON', {
  transform: (_, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
})

module.exports = mongoose.model('Blog', blogSchema)
