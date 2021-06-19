let items = require('../Items')
const { v4: uuidv4 } = require('uuid');

const getItems = (request, reply) => {
    reply.send(items);
}

const getItem = (request, reply) => {
    const { id } = request.params

    const item = items.find((item) => item.id === id)

    reply.send(item)

}

const addItem = (request, reply) => {
    const { name } = request.body;
    const item = {
        id: uuidv4(),
        name
    }

    items = [...items, item]

    reply.code(201).send(item);
}

const deleteItem = (request, reply) => {
    const { id } = request.params;

    items = items.filter(item => item.id !== id)

    reply.send({ message: `Item ${id} has been removed` })
}

const updateItem = (request, reply) => {
    const { id } = request.params
    const { name } = request.body

    items = items.map(item => (item.id === id ? { id, name } : item))

    updatedItem = items.find(item => item.id === id)

    reply.send(updatedItem);
}

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem
}