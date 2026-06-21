const prisma = require('../config/db');

const StoreModel = {
  findById: (id) =>
    prisma.store.findUnique({
      where: { id },
      include: { owner: { select: { id: true, name: true, email: true } } },
    }),
  findAll: (filters = {}) =>
    prisma.store.findMany({
      where: filters,
      include: { owner: { select: { id: true, name: true, email: true } } },
      orderBy: { name: 'asc' },
    }),
  create: (data) => prisma.store.create({ data }),
  update: (id, data) => prisma.store.update({ where: { id }, data }),
  delete: (id) => prisma.store.delete({ where: { id } }),
  findByOwnerId: (ownerId) =>
    prisma.store.findUnique({
      where: { ownerId },
      include: {
        ratings: {
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    }),
};

module.exports = StoreModel;
