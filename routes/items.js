const items = require('../Items')
const { getUser, addUser, deleteUser, updateUser, getUsers } = require('../controllers/items')

const User = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}

const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: User
            },
        },
    },
    handler: getUsers
}

const getUserOpts = {
    schema: {
        response: {
            200: User
        }
    },
    handler: getUser
}

const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: User
        }
    },
    handler: addUser
}

const deleteUserOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    },
    handler: deleteUser
}

const updateUserOpts = {
    schema: {
        response: {
            200: User
        }
    },
    handler: updateUser
}

function itemRoutes(fastify, options, done) {


    fastify.get('/users', getUsersOpts)

    //Get a single item
    fastify.get('/users/:id', getUserOpts)

    //Add item
    fastify.post('/users', postUserOpts)

    //Delete item
    fastify.delete('/users/:id', deleteUserOpts)

    //Update item
    fastify.put('/users/:id', updateUserOpts)

    done()
}

module.exports = itemRoutes