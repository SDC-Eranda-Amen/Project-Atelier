const db = require('../../db');
const Meta = require('../../db/meta.js');
const ReviewsList = require('../../db/reviews.js');
module.exports = {
  getReviews: (page, count, sort, product, res) => {
    var response = {product, page, count};
    // find the range of reviews that you want to return in results
    var resultRangeStart = (count*page) - count;
    var resultRangeEnd = (count*page);

    // if sort === 'newest', sort = 'date'?
    if (sort === 'newest') sort = 'date';
    // query ReviewsList for all reviews with product_id, sort by the sort argument
    ReviewsList.find({product_id: product.toString()}).sort({[sort]: -1}).exec().then((results)  => {
      // get a slice of resultRangeStart to resultRangeEnd from the results, and make it the results property of response
      // get a slice of resultRangeStart to resultRangeEnd from the results, and make it the results property of response
      var reviewRange = results.slice(resultRangeStart, resultRangeEnd + 1);
      response.results = reviewRange;
      res.send(response);
    }).catch((err) => {
      res.status(500).send(err);
    });

  },
  getReviewMeta:() => {

  }, // func queries database to get meta-data for a single product's reviews
  postReview: () => {

  }, // func queries database to add a review
  addHelpful: () => {

  }, // func queries database to add to a review's helpful count
  reportReview: () => {

  } // func queries database to make
}