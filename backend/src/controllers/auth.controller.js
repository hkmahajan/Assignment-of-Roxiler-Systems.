const AuthService = require('../services/auth.service');

const AuthController = {
  register: async (req, res, next) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const result = await AuthService.changePassword(req.user.id, req.body);
      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  me: async (req, res, next) => {
    try {
      const UserModel = require('../repositories/user.repository');
      const user = await UserModel.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      const { password, ...safe } = user;
      res.status(200).json({ success: true, user: safe });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;
