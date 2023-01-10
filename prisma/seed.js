const { PrismaClient } = require('@prisma/client');
const { users } = require('./data.js');
const prisma = new PrismaClient();

console.log('prisma', prisma);

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log('Deleted records in user table');

    // await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    // console.log('reset user auto increment to 1');

    await prisma.user.createMany({
      data: users,
    });
    console.log('Added user data');

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();