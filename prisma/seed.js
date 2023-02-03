const { PrismaClient } = require('@prisma/client');
const { users, colonies } = require('./data.js');

console.log('loading prisma client')
const prisma = new PrismaClient();

console.log('prisma loaded');

const load = async () => {
  try {

    const deletedColonyCount = await prisma.colony.deleteMany()
    console.log('deletedColonyCount', deletedColonyCount)
    const deletedUserCount = await prisma.user.deleteMany()
    console.log('deletedUserCount', deletedUserCount)

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log('reset user auto increment to 1');
    await prisma.$queryRaw`ALTER TABLE Colony AUTO_INCREMENT = 1`;
    console.log('reset colony auto increment to 1');

    for (const user of users) {
      await prisma.user.create({
        data: user
      });
      console.log('Added a user');
    }

    for (const colony of colonies) {
      await prisma.colony.create({
        data: colony
      });
      console.log('Added a colony');
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();