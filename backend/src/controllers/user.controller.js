const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');

const UserController = {
    getAllUsers: async (req, res, next) => {
    try {
      const { name, email, address, role } = req.query;
      const filters = {};
      if (name) filters.name = { contains: name, mode: 'insensitive' };
      if (email) filters.email = { contains: email, mode: 'insensitive' };
      if (address) filters.address = { contains: address, mode: 'insensitive' };
      if (role) filters.role = role;

      const users = await UserModel.findAll(filters);
      res.status(200).json({ success: true, users });
    } catch (err) {
      next(err);
    }
  },

    getUserById: async (req, res, next) => {
    try {
      const user = await UserModel.findById(parseInt(req.params.id));
      if (!user) return res.status(404).json({ message: 'User not found.' });
      const { password, ...safe } = user;
      res.status(200).json({ success: true, user: safe });
    } catch (err) {
      next(err);
    }
  },

    createUser: async (req, res, next) => {
    try {
      const { name, email, password, address, role } = req.body;
      const existing = await UserModel.findByEmail(email);
      if (existing) return res.status(409).json({ message: 'Email already in use.' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ name, email, password: hashedPassword, address, role });
      const { password: _, ...safe } = user;
      res.status(201).json({ success: true, user: safe });
    } catch (err) {
      next(err);
    }
  },

    deleteUser: async (req, res, next) => {
    try {
      await UserModel.delete(parseInt(req.params.id));
      res.status(200).json({ success: true, message: 'User deleted.' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
