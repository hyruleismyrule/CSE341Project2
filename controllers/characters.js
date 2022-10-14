// ***************
// Controllers - controllers/characters.js
// ***************

// Imports
const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// console.log(mongodb);

// Main
// GET / Read
// All
const getAllCharacters = async (req, res) => {
  const result = await mongodb.getDb().db('genshinImpact').collection('characters').find().toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

// One
const getCharacterById = async (req, res) => {
  const characterId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().db('genshinImpact').collection('characters').find({ _id: characterId }).toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

// POST / Create
// One
const createCharacter = async (req, res) => {
  const character = {
    name: req.body.name,
    rarity: req.body.rarity,
    vision: req.body.vision,
    birthday: req.body.birthday,
    constelation: req.body.constelation,
    modelType: req.body.modelType,
    specialDish: req.body.specialDish,
    region: req.body.region,
    talents: req.body.talents
  };
  const response = await mongodb.getDb().db('genshinImpact').collection('characters').insertOne(character);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the character.');
  }
};

// PUT / Update
const updateCharacter = async (req, res) => {
  const characterId = new ObjectId(req.params.id);
  const character = {
    name: req.body.name,
    rarity: req.body.rarity,
    vision: req.body.vision,
    birthday: req.body.birthday,
    constelation: req.body.constelation,
    modelType: req.body.modelType,
    specialDish: req.body.specialDish,
    region: req.body.region,
    talents: req.body.talents
  };
  const response = await mongodb.getDb().db('genshinImpact').collection('characters').replaceOne({ _id: characterId }, character);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the character.');
  }
};

// DELETE
const deleteCharacter = async (req, res) => {
  const characterId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('genshinImpact').collection('characters').deleteOne({ _id: characterId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the character.');
  }
};

// Exports
module.exports = { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };
