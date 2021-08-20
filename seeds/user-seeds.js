const { User } = require('../models');

const userData = [{
        username: 'Kathy',
        password: 'Rainbow'

    },
    {
        username: 'Bibiana',
        password: 'Colombia'
    },
    {
        username: 'Guillermo',
        password: 'Mexico'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;