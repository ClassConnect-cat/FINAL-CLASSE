const mongoose = require('mongoose');
const mongodb = mongoose.mongo;

class Lang {
	constructor(database) {
		/**
		 * @type {import('mongodb').Db}
		 */
		this.db = database;
		this.collection = this.db.collection('idiomes');
	}

	async create({ classId, price}) {
		const data = { classId };
		if (price !== undefined) {
			data.price = price;
		}
		console.log(data);
		const result = await this.collection.insertOne(data);
		return result.insertedId.toString();
	}

	async get(id) {
		const result = await this.collection.findOne({'_id': new mongodb.ObjectId(""+id)});
		return result;
	}

	async getAll() {
		const result = await this.collection.find().toArray();
		return result;
	}

	async getUserByEmail(email) {
		const result = await this.collection.findOne({ email: email });
		return result;
	}

	async getIdByEmail(email) {
		const result = await this.collection.findOne({ email: email }, { projection: { _id: 1 } });
		return result && result._id.toString();
	}

	async update(id, updates) {
		const result = await this.collection.updateOne({'_id': new mongodb.ObjectId(""+id)}, {$set: updates});
		return result.modifiedCount > 0;
	}

	async delete(id) {
		const result = await this.collection.deleteOne({'_id': new mongodb.ObjectId(""+id)});
		return result.deletedCount > 0;
	}
}

module.exports = Lang;
