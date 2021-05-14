const model = require('../models');
const path = require('path');
const client = require('.././index.js').client;
// calls model query funcs and handles response
module.exports = {
  getReviews: (req, res) => {
    var searchTerm = JSON.stringify({query: req.query, get: 'reviews'});
    client.get(searchTerm, async (err, reviews) => {
      if (err) throw err;
      if (reviews) {
        res.send(reviews);
      } else {
        var result = model.getReviews(Number(req.query.page), Number(req.query.count), req.query.sort, req.query.product_id, res);
        client.setex(searchTerm, 600, JSON.stringify(result));
        res.send(result);
      }
    });
  },
  getReviewMeta: (req, res) => {
    var searchTerm = JSON.stringify({query: req.query, get: 'meta'});
    client.get(searchTerm, async (err, meta) => {
      if (err) throw err;
      if (meta) {
        res.send(meta);
      } else {
        var result = model.getMeta(req.query.product_id,res);
        client.setex(searchTerm, 600, JSON.stringify(result));
        res.send(result);
      }
    });
  },
  postReview: (req, res) => {
    model.postReview(req.body, res);
  },
  addHelpful: (req, res) => {
    model.addHelpful(req.body.id, res);
  },
  reportReview: (req, res) => {
    model.reportReview(req.body.id, res);
  },
  verifyLoader: (req, res) => {
    res.sendFile(path.join(__dirname, 'loaderio-66c6545b6fbcbe0d50d8e48983cf0bab.txt'));
  }
};
