const db = require('../../db');
const Meta = require('../../db/meta.js');
const ReviewsList = require('../../db/reviews.js');
const Characteristics = require('../../db/chars.js')
const { v4: uuidv4 } = require('uuid');
const getReviews = require('./getReviews.js');
const getMeta = require('./getMeta.js');
const postReview = require('./postReview.js');
module.exports = {
  getReviews,
  getMeta,
  postReview,
  addHelpful: (id,res) => {
    // find review by id and increment helpful property
    ReviewsList.findOneAndUpdate({review_id: id}, {$inc: {helpfulness: 1}}).exec()
    .then((result) => {
      console.log('ADD HELPFUL RESULT: ', result);
      res.send('MARKED AS HELPFUL')
    })
    .catch((err) => {
      console.log('ADD HELPFUL ERROR: ', err);
    })
  },
  reportReview: (id,res) => {
    // find review by id and update reported property to true
    ReviewsList.findOneAndUpdate({review_id: id}, {reported: true}).exec()
    .then((result) => {
      console.log('REPORT REVIEW RESULT:', result);
      res.send('REVIEW REPORTED');
    })
    .catch((err) => {
      console.log('REPORT REVIEW ERROR: ', err);
      res.status(500).send('COULD NOT UPDATE REVIEW');
    })

  }
}