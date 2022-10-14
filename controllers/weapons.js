// ***************
// Controllers - controllers/weapons.js
// ***************

// Imports
const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// console.log(mongodb);

// Main
// GET / Read
// All
const getAllWeapons = async (req, res) => {
  const result = await mongodb.getDb().db('genshinImpact').collection('weapons').find().toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

// One
const getWeaponById = async (req, res) => {
  const weaponId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().db('genshinImpact').collection('weapons').find({ _id: weaponId }).toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

// POST / Create
// One
const createWeapon = async (req, res) => {
  const weapon = {
    name: req.body.name,
    rarity: req.body.rarity,
    type: req.body.type,
    refinement: req.body.refinement
  };
  const response = await mongodb.getDb().db('genshinImpact').collection('weapons').insertOne(weapon);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the weapon.');
  }
};

// PUT / Update
const updateWeapon = async (req, res) => {
  const weaponId = new ObjectId(req.params.id);
  const weapon = {
    name: req.body.name,
    rarity: req.body.rarity,
    type: req.body.type,
    refinement: req.body.refinement
  };
  const response = await mongodb.getDb().db('genshinImpact').collection('weapons').replaceOne({ _id: weaponId }, weapon);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the weapon.');
  }
};

// DELETE
const deleteWeapon = async (req, res) => {
  const weaponId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('genshinImpact').collection('weapons').deleteOne({ _id: weaponId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the weapon.');
  }
};

// Exports
module.exports = { getAllWeapons, getWeaponById, createWeapon, updateWeapon, deleteWeapon };
