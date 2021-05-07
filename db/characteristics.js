const mongoose = require('mongoose');
const db = require('./index.js');

const characteristicsSchema = new mongoose.Schema({
  char_id: String,
  name: String,
  prod_id: String,
  reviews: [{
    review_id: String,
    val: Number,
  }]
})
const Characteristics = mongoose.model('Characteristics', characteristicsSchema);

module.exports = Characteristics;