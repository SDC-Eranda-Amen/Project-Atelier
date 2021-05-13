const model = require('../models');
const path = require('path');
// calls model query funcs and handles response
module.exports = {
  getReviews: (req, res) => {
    model.getReviews(Number(req.query.page), Number(req.query.count), req.query.sort, req.query.product_id, res);
  },
  getReviewMeta: (req, res) => {
    model.getMeta(req.query.product_id,res);
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
