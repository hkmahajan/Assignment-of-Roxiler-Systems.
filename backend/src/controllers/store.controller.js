const StoreService = require('../services/store.service');

const StoreController = {
    getAllStores: async (req, res, next) => {
    try {
      const { search } = req.query;
      const userId = req.user?.id;
      const stores = await StoreService.getAllStores({ search, userId });
      res.status(200).json({ success: true, stores });
    } catch (err) {
      next(err);
    }
  },

    getStoreById: async (req, res, next) => {
    try {
      const store = await StoreService.getStoreById(parseInt(req.params.id));
      res.status(200).json({ success: true, store });
    } catch (err) {
      next(err);
    }
  },

    createStore: async (req, res, next) => {
    try {
      const store = await StoreService.createStore(req.body);
      res.status(201).json({ success: true, store });
    } catch (err) {
      next(err);
    }
  },

    getMyStore: async (req, res, next) => {
    try {
      const store = await StoreService.getOwnerStore(req.user.id);
      res.status(200).json({ success: true, store });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = StoreController;
