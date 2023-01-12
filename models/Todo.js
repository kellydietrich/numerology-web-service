const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  yTest:{
    type: Object,
    required: true,
  },
  vowels:{
    type: Object,
    required: true,
  },
  consonants:{
    type: Object,
    required: true,
  },
  lifePath: {
    type: Number,
    required: true,
  },
  destiny:{
    type: Number,
    required: true,
  },
  soul:{
    type: Number,
    required: true,
  },
  personality:{
    type: Number,
    required: true,
  },
  maturity:{
    type: Number,
    required: true,
  },
  birthday:{
    type: Number,
    required: true,
  },
  currentName:{
    type: Number,
    required: true,
  },
  karmicLessons:{
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
