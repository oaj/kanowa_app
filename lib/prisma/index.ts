import "server-only"
import { PrismaClient } from '@prisma/client';

let index: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  index = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  index = global.prisma;
}

export default index;
