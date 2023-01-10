const { Prisma } = require('@prisma/client');

const users = [
  {
    name: 'Anders And',
    email: 'anders@andeby.dr',
  },
  {
    name: 'Andersine And',
    email: 'andersine@amfibia.dr',
  },
  {
    name: 'Mickey Mouse',
    email: 'mickey@amfibia.dr',
  }
];


module.exports = {
  users,
};