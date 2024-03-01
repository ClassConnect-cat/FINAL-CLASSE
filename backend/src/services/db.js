const mongoose = require('mongoose');
let db = null;

module.exports = async () => {
    if(db === null) 
        db = new mongoose.mongo.MongoClient('mongodb://mongodb:27017').db('maria');
    return db;
}
