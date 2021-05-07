const mongoose = require('mongoose');
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
});


//Might need something like this
// {
//   timestamps: true
// }
const ReviewList = mongoose.model('ReviewList', reviewsSchema);

module.exports = ReviewList;

/*
Reading reviews file,
a
*/