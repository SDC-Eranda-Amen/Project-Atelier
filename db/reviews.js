const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = require('./index.js');

const reviewsSchema = new mongoose.Schema({
  product_id: Number,
  review_id: Number,
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
}, {collection: 'official_reviews_list'});


const ReviewList = mongoose.model('official_review_list', reviewsSchema);
autoIncrement.initialize(mongoose.connection);
reviewsSchema.plugin(autoIncrement.plugin, {model: 'official_reviews_list', field:'review_id'});

module.exports = ReviewList;

/*
Reading reviews file,
a
*/