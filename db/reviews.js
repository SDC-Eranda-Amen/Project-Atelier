const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = require('./index.js');

const reviewsSchema = new mongoose.Schema({
  product_id: String,
  review_id: String,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [{
      id: Number,
      url: String
  }],
}, {collection: 'reviewlists'});


const ReviewList = mongoose.model('reviewlists', reviewsSchema);

module.exports = ReviewList;

/*
Reading reviews file,
a
*/