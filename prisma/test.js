const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const test = async () => {
  try {

    const colonies = await prisma.colony.findMany({
      include: {
        president: true,
        treasurer: true,
      }
    })

    console.log('colonies', colonies)


  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

test();