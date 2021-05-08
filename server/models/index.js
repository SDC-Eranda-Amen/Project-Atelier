const db = require('../../db');
const Meta = require('../../db/meta.js');
const ReviewsList = require('../../db/reviews.js');
const Characteristics = require('../../db/chars.js')
module.exports = {
  getReviews: (page, count, sort, product, res) => {
    var response = {product, page, count};
    // find the range of reviews that you want to return in results
    var resultRangeStart = (count*page) - count;
    var resultRangeEnd = (count*page);

    // if sort === 'newest', sort = 'date'?
    if (sort === 'newest') sort = 'date';
    // query ReviewsList for all reviews with product_id, sort by the sort argument
    ReviewsList.find({product_id: product}).sort({[sort]: -1}).exec().then((results)  => {
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
      // make a query to characteristics collection for product_id// maybe change to Number?
      Characteristics.find({product_id: id.toString()}).exec()
      .then((chars) => {
        // iterate over chars
        for (var j = 0; j < chars.length; j++) {
          // char is result[0].characteristics[j]
          var char = chars[i];
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
      })
      .catch((err) => {
        res.status(500).send('ERROR FINDING PRODUCT');
      })

    })
    .catch((err) => {
      res.status(500).send(err)
    })
    res.send(response);
  }, // func queries database to get meta-data for a single product's reviews
  postReview: (body, res) => {


    ReviewsList.create({
      product_id: body.product_id,
      rating: body.rating,
      summary: body.summary,
      recommend: body.recommend,
      body: body.body,
      date: new Date().toDateString(),
      reviewer_name: body.name,
      helpfulness: 0,
      review_photos: body.photos,
    })
    .then((result) => {
      console.log('RESULT: ', result);
      // iterate over body.characteristics, and make a query to push {newReviewId, value}
      var keys = Object.keys(body.characteristics)

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        Characteristics.findOneAndUpdate({id: key},
          {$push: {reviews: {id: result.review_id, value: body.characteristics[key]}}}).exec()
          .then((charPushResult) => {
            console.log('CHAR PUSH RESULT: ', charPushResult)
          })
          .catch((err) => {
            res.status(500).send(err);
          })
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
  },
  addHelpful: (id,res) => {
    // find review by id and increment helpful property
    ReviewsList.findOneAndUpdate({product_id: id}, {$inc: {helpfulness: 1}}).exec()
  },
  reportReview: (id,res) => {
    // find review by id and update reported property to true
    ReviewsList.findOneAndUpdate({product_id: id}, {reported: true}).exec()
    .then((result) => {
      console.log('report review result:', result);
      res.send('REVIEW REPORTED');
    })
    .catch((err) => {
      res.status(500).send('COULD NOT UPDATE REVIEW');
    })

  }
}