const model = require('../models');

// calls model query funcs and handles response
module.exports = {
  getReviews: (req, res) => {
    model.getReviews(Number(req.query.page), Number(req.query.count), req.query.sort, req.query.product_id, res);
  },
  getReviewMeta: (req, res) => {
    model.getReviewMeta(req.query.product_id,res);
  },
  postReview: (req, res) => {
    model.postReview(req.body, res);
  },
  addHelpful: (req, res) => {
    model.addHelpful();
  },
  reportReview: (req, res) => {
    model.reportReview
  }
};