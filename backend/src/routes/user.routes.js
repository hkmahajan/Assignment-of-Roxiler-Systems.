const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { registerRules, validate } = require('../validators');


router.use(authMiddleware, roleMiddleware('ADMIN'));


router.get('/', UserController.getAllUsers);


router.get('/:id', UserController.getUserById);


router.post('/', registerRules, validate, UserController.createUser);


router.delete('/:id', UserController.deleteUser);

module.exports = router;
