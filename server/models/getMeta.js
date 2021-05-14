const Meta = require('../../db/meta.js');
const Characteristics = require('../../db/chars.js')
module.exports = async (id, res) => {
  var response = {product_id: id, ratings: {}, recommended:{}, characteristics:{}};
  // create
  response = await findMeta(id, response, res);
  response = await findChars(id, response, res)
}
const findMeta = (id, response, res) => {
  return new Promise((resolve, reject) => {
    Meta.find({_id: id.toString()}).exec()
    .then((result) => {
      for (var i = 0; i < result[0].meta.length; i++) {
        var review = result[0].meta[i];
        var rating = review.rating;
        var recommend = review.recommend;
        if (response.ratings[rating]) {
          response.ratings[rating] ++;
        } else {
          response.ratings[rating] = 1;
        }
        if (response.recommended[recommend]) {
          response.recommended[recommend] ++;
        } else {
          response.recommended[recommend] = 1;
        }
        resolve(response);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      reject(err);
    })
  })
}

const findChars = async (id, response, res) => {
  return new Promise((resolve, reject) => {
    Characteristics.find({product_id: id.toString()}).exec()
      .then((chars) => {
        for (var j = 0; j < chars.length; j++) {
          var char = (chars[j].toObject());
          var total = 0;
          var charMeta = {id:Number(char.id)};
          for (var k = 0; k < char.reviews.length; k++) {
            total += char.reviews[k].value;
          }
          charMeta.value = (total / char.reviews.length).toString();
          response.characteristics[char.name] = charMeta;
        }
        res.send(response);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      })
  })
};