const RatingModel = require('../repositories/rating.repository');
const StoreModel = require('../repositories/store.repository');

const RatingService = {
    rateStore: async ({ userId, storeId, score }) => {
    const store = await StoreModel.findById(storeId);
    if (!store) {
      const err = new Error('Store not found.');
      err.statusCode = 404;
      throw err;
    }

    const existing = await RatingModel.findByUserAndStore(userId, storeId);
    if (existing) {
      const err = new Error('You have already rated this store. Please edit your existing rating.');
      err.statusCode = 409;
      throw err;
    }

    const rating = await RatingModel.create({ userId, storeId, score });

    
    const avg = await RatingModel.averageByStore(storeId);
    await StoreModel.update(storeId, { averageRating: avg });

    return rating;
  },

    editRating: async ({ userId, storeId, score }) => {
    const existing = await RatingModel.findByUserAndStore(userId, storeId);
    if (!existing) {
      const err = new Error('No existing rating found for this store.');
      err.statusCode = 404;
      throw err;
    }

    const updated = await RatingModel.update(existing.id, { score });

    
    const avg = await RatingModel.averageByStore(storeId);
    await StoreModel.update(storeId, { averageRating: avg });

    return updated;
  },

    getStoreRatings: async (storeId) => {
    return RatingModel.findByStore(storeId);
  },
};

module.exports = RatingService;
