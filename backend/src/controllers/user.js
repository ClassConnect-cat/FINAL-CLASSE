const Model = require('../models/user');
const getDb = require('../services/db');
const auth = require('../services/auth');

function sanitizeUser(user) {
  delete user.hash;
  delete user.salt;
  return user;
}

let model = null;
(async () => {
  const db = await getDb();
  model = new Model(db);
  console.log("User model created");
})();

// Create a new user
exports.create = async (req, res) => {
    const userdata = req.body;
    // check if any value is missing
    if (!userdata.name || !userdata.email || !userdata.password) {
      return res.status(400).send({
        message: "Content can not be empty"
      });
    }
    const salt = auth.createSalt();
    const hash = auth.createHash(userdata.password, salt);
    const user = { name: userdata.name, email: userdata.email, hash, salt, profe: userdata.profe, description: userdata.description ?? '', classes_dones: [], classes_rebs: []};
    //Check if exists
    try {
      const result = await model.getUserByEmail(userdata.email);
      if (result) return res.status(400).send({
        message: "User already exists"
      });

      const id = await model.create(user);
      res.status(200).send({ token: auth.signToken({ id: id ?? 0, profe: userdata.profe } )});
    } catch (error) {
      console.error(error)
      return res.status(500).send(error);
    }
  };
  
  exports.login = async (req, res) => {
    const userdata = req.body;
    // check if any value is missing
    console.log(userdata);
    if (!userdata.email || !userdata.password) {
      return res.status(400).send({
        message: "Content can not be empty"
      });
    }
    try {
      const result = await model.getUserByEmail(userdata.email);

      if (!result) return res.status(404).send("User not found");
      const hash = auth.createHash(userdata.password, result.salt);
      if (result.hash != hash) return res.status(401).send("Invalid password");
      return res.status(200).send({ token: auth.signToken({ id: result._id, profe: userdata.profe }) });
    } catch (error) {

      return res.status(500).send(error);
    }
  }
    
  
  // Edit an existing user
  exports.update = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const updates = req.body;
    console.log(updates);
    delete updates.email;
    delete updates.hash;
    delete updates.salt;
    if (updates.description) {
      //console.log(updates.description);
      updates.description = updates.description;
    }
    if(userId !== req.user.id) return res.status(403).send("Not allowed");
    try {
      const result = await model.update(userId, updates);
      if (!result) return res.status(500).send("Error updating user");
      return res.status(200).send("Has been updated correctly");
    } catch(error) {
      res.status(500).send(error);
    }
  };
  
  // Retrieve all users
  exports.findAll = async (req, res) => {
    try {
      const result = await model.getAll();
      res.status(200).send(result.map(sanitizeUser));
    } catch(error) {
      res.status(500).send(error);
    }

  }
  
  // Retrieve a single user
  exports.findOne = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      const result = await model.get(userId);
      if (!result) return res.status(404).send("User not found");
      sanitizeUser(result);
      res.status(200).send(result);
    } catch(error) {
      res.status(500).send(error);
    }
  };

  exports.findOneByEmail = async (req, res) => {
    const userEmail = req.params.email;
    console.log(userEmail);
    try {
      const result = await model.getUserByEmail(userEmail);
      if (!result) return res.status(404).send("User not found");
      sanitizeUser(result);
      res.status(200).send(result);
    } catch(error) {
      res.status(500).send(error);
    }
  };
  
  // Delete a user
  exports.delete = async (req, res) => {
    const userId = req.params.id;
    if(userId !== req.user.id) return res.status(403).send("Not allowed");
    try {
      const result = await model.delete(userId);
      if (!result) return res.status(404).send("User not found");
      res.status(200).send({
        message: "User deleted successfully"
      });
    } catch(error) {
      res.status(500).send(err);
    }
  };
  
  
