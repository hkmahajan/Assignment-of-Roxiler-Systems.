const prisma = require('../config/db');

const UserModel = {
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  create: (data) => prisma.user.create({ data }),
  update: (id, data) => prisma.user.update({ where: { id }, data }),
  delete: (id) => prisma.user.delete({ where: { id } }),
  findAll: (filters = {}) =>
    prisma.user.findMany({
      where: filters,
      select: { id: true, name: true, email: true, address: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    }),
};

module.exports = UserModel;
