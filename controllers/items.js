let items = require('../Items')
const MongoClient = require('mongodb').MongoClient;
const { v4: uuidv4 } = require('uuid');

//local url
// const url = "mongodb://admin:password@localhost:27017"

const getUsers = (req, reply) => {
    const url = "mongodb://admin:password@mongodb"

    const urlOptions = { useUnifiedTopology: true }
    MongoClient.connect(url, urlOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user-account");
        dbo.collection("users").find({}, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;
            reply.send(JSON.stringify(result))
            db.close();
        });
    });
}

const getUser = (request, reply) => {
    const id1 = request.params.id;

    const url = "mongodb://admin:password@mongodb"

    const urlOptions = { useUnifiedTopology: true }

    MongoClient.connect(url, urlOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user-account");
        dbo.collection("users").find({ id: id1 }).toArray(function (err, result) {
            if (err) throw err;
            console.log(`myid is ${id1}`)
            console.log(`resutl is ${result}`)
            reply.send(JSON.stringify(result))
            db.close();
        });
    });

}

const addUser = (req, reply) => {
    const { name } = req.body;
    const newUser = {
        id: uuidv4(),
        name
    }

    const url = "mongodb://admin:password@mongodb"

    const urlOptions = { useUnifiedTopology: true }

    MongoClient.connect(url, urlOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user-account");
        dbo.collection("users").insertOne(newUser, (err, result) => {
            if (err) throw err;
            db.close()
        })
    });

    reply.code(201).send(newUser);
}


const deleteUser = (request, reply) => {
    const id1 = request.params.id;

    const url = "mongodb://admin:password@mongodb"

    const urlOptions = { useUnifiedTopology: true }

    MongoClient.connect(url, urlOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user-account");
        dbo.collection("users").deleteOne({ id: id1 }, (err, result) => {
            if (err) throw err;
            db.close()
        })
    });

    reply.send({ message: `Item ${id1} has been removed` })
}

const updateUser = (request, reply) => {
    const id1 = request.params.id;
    const name1 = request.body.name;

    const url = "mongodb://admin:password@mongodb"

    const urlOptions = { useUnifiedTopology: true }

    MongoClient.connect(url, urlOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user-account");
        let myQuery = { id: id1 }
        let newValues = { $set: { id: id1, name: name1 } };
        dbo.collection("users").updateOne(myQuery, newValues, (err, result) => {
            if (err) throw err;
            db.close()
        })
    });

    reply.send({ id: id1, name: name1 });
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getUsers
}