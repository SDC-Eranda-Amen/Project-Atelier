const controllers = require('../controllers');
const router = require('express').Router();

router.get('/reviews', controllers.getReviews);
router.get('/reviews/meta', controllers.getReviewMeta);
router.post('/reviews', controllers.postReview);
router.put('/reviews/helpful', controllers.addHelpful);// change format?
router.put('/reviews/report', controllers.reportReview)

module.exports = router;
