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
  getReviewMeta:(id, res) => {
    var response = {product_id: id, ratings: {}, recommended:{}, characteristics:{}};
    Meta.find({_id: id.toString()}).exec()
    .then((result) => {
      // iterate over result[0].meta
      for (var i = 0; i < result[0].meta.length; i++) {
        // review is result[0].meta[i]
        var review = result[0].meta[i];
        // rating is review.rating
        var rating = review.rating;
        // recommend is review.recommended
        var recommend = review.recommend;
        // if reponse.ratings[rating] exists, add 1, else set it to 1
        if (response.ratings[rating]) {
          response.ratings[rating] ++;
        } else {
          response.ratings[rating] = 1;
        }
        // if response.recommended[recommend] exists, add 1, else set it to 1
        if (response.recommended[recommend]) {
          response.recommended[recommend] ++;
        } else {
          response.recommended[recommend] = 1;
        }
      }
      // iterate over result[0].characteristics
      for (var j = 0; j < result[0].characteristics.length; j++) {
        // char is result[0].characteristics[j]
        var char = result[0].characteristics[j];
        // var total is 0
        var total = 0;
        // charMeta {id: char.id}
        var charMeta = {id:Number(char.id)};
        // iterate over char reviews
        for (var k = 0; k < char.reviews.length; k++) {
          // total += review.value
          total += char.reviews[k].value;
        }
        // charMeta.value = total / char.reviews.length
        charMeta.value = (total / char.reviews.length).toString();
        // response.characteristics[char.name] = charMeta
        response.characteristics[char.name] = charMeta;

      }
      res.send(response);

    })
    .catch((err) => {
      res.status(500).send(err)
    })
  }, // func queries database to get meta-data for a single product's reviews
  postReview: () => {

  }, // func queries database to add a review
  addHelpful: () => {

  }, // func queries database to add to a review's helpful count
  reportReview: () => {

  } // func queries database to make
}