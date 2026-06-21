const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/rating.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { ratingRules, validate } = require('../validators');


router.post('/', authMiddleware, roleMiddleware('USER'), ratingRules, validate, RatingController.rateStore);


router.put('/:storeId', authMiddleware, roleMiddleware('USER'), ratingRules, validate, RatingController.editRating);


router.get('/store/:storeId', authMiddleware, roleMiddleware('STORE_OWNER'), RatingController.getStoreRatings);

module.exports = router;
