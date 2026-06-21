const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { generateToken } = require('../utils/jwt');

const AuthService = {
    register: async ({ name, email, password, address, role }) => {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      const err = new Error('Email is already registered.');
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, address, role });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

    login: async ({ email, password }) => {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

    changePassword: async (userId, { oldPassword, newPassword }) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      const err = new Error('Old password is incorrect.');
      err.statusCode = 400;
      throw err;
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    await UserModel.update(userId, { password: hashedNew });
    return { message: 'Password changed successfully.' };
  },
};

module.exports = AuthService;
