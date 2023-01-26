const { Prisma } = require('@prisma/client');

const users = [
  {
    firstname: 'Anders',
    lastname: 'And',
    email: 'anders@andeby.dr',
  },
  {
    firstname: 'Andersine',
    lastname: 'And',
    email: 'andersine@amfibia.dr',
  },
  {
    firstname: 'Mickey',
    lastname: 'Mouse',
    email: 'mickey@amfibia.dr',
  }
];


module.exports = {
  users,
};