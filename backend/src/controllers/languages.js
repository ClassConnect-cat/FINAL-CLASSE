const UserModel = require('../models/user');
const Model = require('../models/languages');
const ScheduleModel = require('../models/schedule');
const getDb = require('../services/db');
const auth = require('../services/auth');//Necesito per el token?
const mongoose = require('mongoose');

let model = null;
(async () => {
  const db = await getDb();
  model = new Model(db);
  console.log("Idiomas model created");
})();

let userModel = null;
(async () => {
  const db = await getDb();
  userModel = new UserModel(db);
  console.log("users model created, en arrxiu languages.js");
})();

let scheduleModel = null;
(async () => {
  const db = await getDb();
  scheduleModel = new ScheduleModel(db);
  console.log("schedual model created, en arrxiu languages.js");
})();

// Funció per obtenir totes les classes d'idiomes
async function getAllClasses(req, res) {
	console.log("getAllClasses");
	try {
		const classes = await model.getAll();
		res.json(classes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Funció per obtenir una classe d'idioma específica segons l'ID
async function getOneClass(req, res) {
  const id = req.params.id;
  try {
	const language = await model.get(id);
	if (language) {
	  res.json(language);
	} else {
	  res.status(404).json({ message: 'Language not found' });
	}
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
}

// Funció per afegir una relació idioma usuari
async function addClassesDono(req, res) {
	const { userId, classId, price, startTime, endTime } = req.body;
	//console.log("userId: ", userId);
	//console.log("classId: ", classId);
	//console.log("price: ", price);
	console.log("startTime: ", startTime);
	console.log("endTime: ", endTime);

	try {
		const user = await userModel.get(userId); // Obté les dades de l'usuari des de la base de dades
		//console.log(user);
		//console.log("es profee???", user.profe);
		if (user.profe)
		{
			const timeId = await addSchedule({ startTime, endTime });
			console.log("timeId: ", timeId);
			let result = await userModel.collection.findOneAndUpdate(
				{ _id: new mongoose.mongo.ObjectId(userId) },
				{ $push: 
					{
						classes_dones: { 
							items: { 
								properties: { 
									classId: new mongoose.mongo.ObjectId(classId),
									price: price,
									timeId: new mongoose.mongo.ObjectId(timeId),
								}
							}
						}
					}
				},
				{ new: true } 
			);
			res.status(200).json({ message: 'Relació idioma usuari afegida amb èxit' });
		} else {
			res.status(403).json({ message: 'L\'usuari no té permís per donar classes' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Hi ha hagut un error en afegir la relació idioma usuari', error: error.message });
	}
}

async function addClassesRebo(req, res) {

	//comprovar si ja hi ha una relació entre l'usuari i la classe

	const { classId, userId, startTime, endTime } = req.body;
	//console.log("userId: ", userId);
	//console.log("classId: ", classId);
	//console.log("startTime: ", startTime);
	//console.log("endTime: ", endTime);
	const timeId = await addSchedule({ startTime, endTime });
	console.log("timeId: ", timeId);
	try {
		let result = await userModel.collection.findOneAndUpdate(
			{ _id: new mongoose.mongo.ObjectId(userId) }, 
			{ $push: 
				{ 
					classes_rebs: { 
						items: { 
							properties: { 
								classId: new mongoose.mongo.ObjectId(classId),
								timeId: new mongoose.mongo.ObjectId(timeId),
							}
						}
					}
				}
			}, 
			{ new: true } 
		);
		res.status(200).json({ message: 'Relació idioma usuari afegida amb èxit' });
    } catch (error) {
        res.status(500).json({ message: 'Hi ha hagut un error en afegir la relació idioma usuari', error: error.message });
    }
}


async function addSchedule(scheduleData) {
	const { startTime, endTime } = scheduleData;
	//console.log("startTime: ", startTime);
	//console.log("endTime: ", endTime);
	const startTimeDate = new Date(startTime);
	const endTimeDate = new Date(endTime);
	try {
		const result = await scheduleModel.collection.insertOne({ startTime: startTimeDate , endTime:endTimeDate });
		return result.insertedId;
	} catch (error) {
		return error.message;
	}
}

module.exports = {
  getAllClasses,
  getOneClass,
  addClassesDono,
  addClassesRebo
};
