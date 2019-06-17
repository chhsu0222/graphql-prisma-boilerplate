import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Jen',
        email: 'jen@example.com',
        password: bcrypt.hashSync('Red098!@#$')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Sarah',
        email: 'sarah@example.com',
        password: bcrypt.hashSync('Red098!@#$')
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async () => {
    // Because the operations in beforeEach take more time than
    // the default setting of Jest, we need to specify the timeout limit.
    jest.setTimeout(20000)

    // Delete test data
    await prisma.mutation.deleteManyUsers()
    
    // Create userOne
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create userTwo
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
}

export { seedDatabase as default, userOne, userTwo }
