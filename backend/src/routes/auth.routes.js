const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { registerRules, loginRules, changePasswordRules, validate } = require('../validators');


router.post('/register', registerRules, validate, AuthController.register);


router.post('/login', loginRules, validate, AuthController.login);


router.post('/change-password', authMiddleware, changePasswordRules, validate, AuthController.changePassword);


router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
