const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { storeRules, validate } = require('../validators');


router.get('/', authMiddleware, StoreController.getAllStores);


router.get('/my-store', authMiddleware, roleMiddleware('STORE_OWNER'), StoreController.getMyStore);


router.get('/:id', authMiddleware, StoreController.getStoreById);


router.post('/', authMiddleware, roleMiddleware('ADMIN'), storeRules, validate, StoreController.createStore);

module.exports = router;
