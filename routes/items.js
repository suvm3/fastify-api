const items = require('../Items')
const { getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items')

const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            },
        },
    },
    handler: getItems
}

const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}

const postItemsOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}

const deleteItemOpts = {
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
    handler: deleteItem
}

const updateItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: updateItem
}

function itemRoutes(fastify, options, done) {
    //Get all items
    fastify.get('/items', getItemsOpts)

    //Get a single item
    fastify.get('/items/:id', getItemOpts)

    //Add item
    fastify.post('/items', postItemsOpts)

    //Delete item
    fastify.delete('/items/:id', deleteItemOpts)

    //Update item
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes