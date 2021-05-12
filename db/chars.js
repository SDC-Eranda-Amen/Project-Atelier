const mongoose = require('mongoose');
const db = require('./index.js');

const charsSchema = new mongoose.Schema({
  id: String,
  product_id: String,
  reviews: [{id: String, value: Number}]
}, {collection: 'aggregated_chars'})

const Chars = mongoose.model('aggregated_chars', charsSchema);

module.exports = Chars;