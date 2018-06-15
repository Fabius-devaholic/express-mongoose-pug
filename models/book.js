/**
 * Module dependencies.
 */

const mongoose = require('mongoose')

/**
 * Book Schema
 */

const BookSchema = new mongoose.Schema({
  thumbnail: {
    type: mongoose.Schema.Types.String,
    default: ''
  },
  title: {
    type: mongoose.Schema.Types.String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.String,
    default: ''
  },
  file: {
    type: mongoose.Schema.Types.String,
    default: ''
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('books', BookSchema)
