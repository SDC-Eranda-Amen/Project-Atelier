const controllers = require('../controllers');
const router = require('express').Router();

router.get('/reviews', controllers.getReviews);
router.get('/reviews/meta', controllers.getReviewMeta);
router.post('/reviews', controllers.postReview);
router.put('/reviews/helpful', controllers.addHelpful);
router.put('/reviews/report', controllers.reportReview);
router.get('/loaderio-66c6545b6fbcbe0d50d8e48983cf0bab.txt', controllers.verifyLoader)

module.exports = router;
