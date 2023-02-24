const users = [
    {
        firstname: 'Anders',
        lastname: 'And',
        email: 'anders@andeby.dr',
        username: 'and',
        password: 'and',
        role: 'ADMIN'
    },
    {
        firstname: 'Andersine',
        lastname: 'And',
        email: 'andersine@amfibia.dr',
        username: 'sine',
        password: 'sine',
        role: 'USER'
    },
    {
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@amfibia.dr',
    }
];

const colonies = [{
    name: "Xiomara II",
    address: "C/27",
    nearBy: "RosAutos",
    city: "Santa Domingo",
    type: "APARTMENTS",
    president: {
        connect: {id: 1}
    },
    treasurer: {
        connect: {id: 2}
    },
    secretary: {
        connect: {id: 3}
    },
},
//   {
//   name: "Karla II",
//   address: "Pr.Vasquez",
//   nearBy: "Colmado Familia",
//   city: "Santa Domingo",
//   type: "APARTMENTS",
//   president: 2,
//   treasurer: 3,
//   secretary: 1,
// }
]


module.exports = {
  users, colonies
};