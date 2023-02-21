require('dotenv')
require('./../db')
const User = require('./../models/User.model')
const Sighting = require('./../models/Sighting.model')
const bcrypt = require('bcryptjs')
const password = '1234'
const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password, salt)

const users = [
    {
        username: 'Tom',
        password: hashedPassword
    }, {
        username: 'Keifer',
        password: hashedPassword
    }, {
        username: 'Fabien',
        password: hashedPassword
    },
]

const sightings = [
    {
        location: 'Paris',
        description: 'Scary hairy dude by the bank of the Seine',
        date: new Date('01/19/2023'),
    }, {
        location: 'Bordeaux',
        description: 'Close to a wine shop, drunk!',
        date: new Date('02/15/2023'),
    }, {
        location: 'Texas',
        description: 'Shooting his gun at ducks',
        date: new Date('06/19/2022'),
    },
]

seed()

async function seed() {
    await User.deleteMany()
    await Sighting.deleteMany()
    const createdUsers = await User.create(users)
    for (const sight of sightings) {
        sight.owner = randomUser(createdUsers)
    }
    await Sighting.create(sightings)
}

function randomUser(array) {
    return array[Math.floor(Math.random() * array.length)]._id
}