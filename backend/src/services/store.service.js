const StoreModel = require('../models/Store');
const RatingModel = require('../models/Rating');
const prisma = require('../config/db');

const StoreService = {
    getAllStores: async ({ search, userId } = {}) => {
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    const stores = await StoreModel.findAll(where);

    
    if (userId) {
      const userRatings = await prisma.rating.findMany({
        where: { userId },
        select: { storeId: true, score: true, id: true },
      });
      const ratingMap = new Map(userRatings.map((r) => [r.storeId, r]));
      return stores.map((s) => ({ ...s, myRating: ratingMap.get(s.id) || null }));
    }

    return stores;
  },

    getStoreById: async (id) => {
    const store = await StoreModel.findById(id);
    if (!store) {
      const err = new Error('Store not found.');
      err.statusCode = 404;
      throw err;
    }
    return store;
  },

    createStore: async (data) => {
    return StoreModel.create(data);
  },

    getOwnerStore: async (ownerId) => {
    const store = await StoreModel.findByOwnerId(ownerId);
    if (!store) {
      const err = new Error('No store associated with this account.');
      err.statusCode = 404;
      throw err;
    }
    const avg = await RatingModel.averageByStore(store.id);
    return { ...store, averageRating: parseFloat(avg.toFixed(2)) };
  },
};

module.exports = StoreService;
