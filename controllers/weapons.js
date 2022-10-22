// ***************
// Controllers - controllers/weapons.js
// ***************

// Imports
const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;


// Main
// GET / Read
const getAllWeapons = async (req, res) => {
  try {
    await mongodb.getDb().db('genshinImpact').collection('weapons').find().toArray()
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the weapons.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getWeaponById = async (req, res) => {
  try {
    const weaponId = new ObjectId(req.params.id);
    if (!weaponId) {
      res.status(400).send({ message: 'Invalid weapon ID supplied.' });
      return;
    }
    await mongodb.getDb().db('genshinImpact').collection('weapons').find({ _id: weaponId }).toArray()
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the weapon.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST / Create
const createWeapon = async (req, res) => {
  try {
  const weapon = {
    name: req.body.name,
    rarity: req.body.rarity,
    type: req.body.type,
    passiveAbility: req.body.passiveAbility,
  };
    const response = await mongodb.getDb().db('genshinImpact').collection('weapons').insertOne(weapon);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the weapon.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT / Update
const updateWeapon = async (req, res) => {
  try {
    const weaponId = new ObjectId(req.params.id);
    if (!weaponId) {
      res.status(400).send({ message: 'Invalid weapon ID supplied.' });
      return;
    }
    const weapon = {
      name: req.body.name,
      rarity: req.body.rarity,
      type: req.body.type,
      passiveAbility: req.body.passiveAbility,
    };
    const response = await mongodb.getDb().db('genshinImpact').collection('weapons').replaceOne({ _id: weaponId }, weapon);
    if (response.modifiedCount > 0) {
      res.status(204).send({ message: 'Weapon updated sucessfuly.' });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the weapon.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteWeapon = async (req, res) => {
  try {
    const weaponId = new ObjectId(req.params.id);
    if (!weaponId) {
      res.status(400).send({ message: 'Invalid weapon ID supplied.' });
      return;
    }
    const response = await mongodb.getDb().db('genshinImpact').collection('weapons').deleteOne({ _id: weaponId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the weapon.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the weapon.');
  }
};

// Exports
module.exports = { getAllWeapons, getWeaponById, createWeapon, updateWeapon, deleteWeapon };
