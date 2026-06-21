const prisma = require('../config/db');

const RatingModel = {
  findById: (id) =>
    prisma.rating.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true } }, store: true },
    }),
  findByUserAndStore: (userId, storeId) =>
    prisma.rating.findUnique({ where: { userId_storeId: { userId, storeId } } }),
  findByStore: (storeId) =>
    prisma.rating.findMany({
      where: { storeId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  create: (data) => prisma.rating.create({ data }),
  update: (id, data) => prisma.rating.update({ where: { id }, data }),
  delete: (id) => prisma.rating.delete({ where: { id } }),
  averageByStore: async (storeId) => {
    const result = await prisma.rating.aggregate({
      where: { storeId },
      _avg: { score: true },
    });
    return result._avg.score || 0;
  },
};

module.exports = RatingModel;
