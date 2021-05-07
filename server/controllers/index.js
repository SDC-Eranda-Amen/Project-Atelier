const model = require('../models');

// calls model query funcs and handles response
module.exports = {
  getReviews: (req, res) => {
    model.getReviews(req.query.page, req.query.count, req.query.sort, req.query.product_id, res);
  },
  getReviewMeta: (req, res) => {
    model.getReviewMeta();
  },
  postReview: (req, res) => {
    model.postReview();
  },
  addHelpful: (req, res) => {
    model.addHelpful();
  },
  reportReview: (req, res) => {
    model.reportReview
  }
};
