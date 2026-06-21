const RatingService = require('../services/rating.service');

const RatingController = {
    rateStore: async (req, res, next) => {
    try {
      const { storeId, score } = req.body;
      const rating = await RatingService.rateStore({
        userId: req.user.id,
        storeId: parseInt(storeId),
        score: parseInt(score),
      });
      res.status(201).json({ success: true, rating });
    } catch (err) {
      next(err);
    }
  },

    editRating: async (req, res, next) => {
    try {
      const { score } = req.body;
      const rating = await RatingService.editRating({
        userId: req.user.id,
        storeId: parseInt(req.params.storeId),
        score: parseInt(score),
      });
      res.status(200).json({ success: true, rating });
    } catch (err) {
      next(err);
    }
  },

    getStoreRatings: async (req, res, next) => {
    try {
      const ratings = await RatingService.getStoreRatings(parseInt(req.params.storeId));
      res.status(200).json({ success: true, ratings });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = RatingController;
