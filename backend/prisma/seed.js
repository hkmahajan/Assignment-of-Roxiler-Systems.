const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@storerate.com',
      password: passwordHash,
      role: 'ADMIN',
      address: '123 Admin St, Server City',
    },
  });

  const owner1 = await prisma.user.create({
    data: {
      name: 'Owner Alice',
      email: 'alice@store.com',
      password: passwordHash,
      role: 'STORE_OWNER',
      address: '456 Owner Ave',
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      name: 'Owner Bob',
      email: 'bob@store.com',
      password: passwordHash,
      role: 'STORE_OWNER',
      address: '789 Owner Blvd',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Charlie Customer',
      email: 'charlie@gmail.com',
      password: passwordHash,
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Dave Shopper',
      email: 'dave@gmail.com',
      password: passwordHash,
      role: 'USER',
    },
  });

  const store1 = await prisma.store.create({
    data: {
      name: 'Alice Electronics',
      email: 'contact@aliceelectronics.com',
      address: '10 Tech Park, Silicon Valley',
      ownerId: owner1.id,
      averageRating: 4.5,
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Bob Books',
      email: 'hello@bobbooks.com',
      address: '55 Literary Lane',
      ownerId: owner2.id,
      averageRating: 4.0,
    },
  });

  await prisma.rating.createMany({
    data: [
      { score: 5, userId: user1.id, storeId: store1.id },
      { score: 4, userId: user2.id, storeId: store1.id },
      { score: 3, userId: user1.id, storeId: store2.id },
      { score: 5, userId: user2.id, storeId: store2.id },
    ],
  });

  console.log('Seeding completed perfectly!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
