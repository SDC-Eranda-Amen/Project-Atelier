const { v4: uuidv4 } = require('uuid');
const Meta = require('../../db/meta.js');
const ReviewsList = require('../../db/reviews.js');
const Characteristics = require('../../db/chars.js');
module.exports = async (body, res) => {

  var unique_id = uuidv4();
  await reviewListPost(body, unique_id, res);
  var keys = Object.keys(body.characteristics)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    await characteristicsPost(key, body.characteristics, unique_id, res);
  }
  await metaPost(body.product_id.toString(), body.rating, body.recommend, res);
  res.send('SUCCESSFULLY POSTED REVIEW');
}

const reviewListPost = (body, unique_id, res) => {
  return new Promise((resolve, reject) => {
    ReviewsList.create({
      review_id: unique_id,
      product_id: body.product_id.toString(),
      rating: body.rating,
      summary: body.summary,
      recommend: body.recommend,
      body: body.body,
      date: new Date().toDateString(),
      reviewer_name: body.name,
      helpfulness: 0,
      photos: body.photos,
    })
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      res.status(500).send(err);
      reject(err);
    })
  })
}
const characteristicsPost = (key, chars, unique_id, res) => {
  return new Promise((resolve, reject) => {
    Characteristics.findOneAndUpdate({id: key},
      {$push: {reviews: {id: unique_id, value: chars[key]}}}).exec()
      .then((charPushResult) => {
        resolve(charPushResult);
      })
      .catch((err) => {
        res.status(500).send(err);
        reject(err);
      })
  })
}

const metaPost = (id, rating, recommend, res) => {
  return new Promise((resolve, reject) => {
    Meta.findOneAndUpdate({_id: id}, {$push: {meta: {rating: rating.toString(), recommend: Boolean(recommend)}}})
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      res.status(500).send(err);
      reject(err)
    })
  })
}
