const mongoose = require('mongoose');
const db = require('./index.js');

const charsSchema = new mongoose.Schema({
  _id: Number,
  product_id: Number,
  reviews[{id: Number, value: Number}]
}, {collection: 'aggregated_chars'})

const Chars = mongoose.model('aggregated_chars', charsSchema);

module.exports = Chars;