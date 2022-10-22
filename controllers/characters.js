// ***************
// Controllers - controllers/characters.js
// ***************

// Imports
const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../validation.js');
const characterValidator = validator.characterValidation;



// Main
// GET / Read
// All
const getAllCharacters = async (req, res) => {
  try {
    await mongodb.getDb().db('genshinImpact').collection('characters').find().toArray()
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the characters.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// One
const getCharacterById = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    if (!characterId) {
      res.status(400).send({ message: 'Invalid character ID supplied.' });
      return;
    }
    await mongodb.getDb().db('genshinImpact').collection('characters').find({ _id: characterId }).toArray()
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the character.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST / Create
// One
const createCharacter = async (req, res) => {
  try {
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
    const characterCheck = characterValidator(characterCheck);
    if (characterCheck.error) {
      res.status(400).send({ message: characterCheck.error });
      return;
    }
    const response = await mongodb.getDb().db('genshinImpact').collection('characters').insertOne(character);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the character.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT / Update
const updateCharacter = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    if (!characterId) {
      res.status(400).send({ message: 'Invalid character ID supplied.' });
      return;
    }
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
    const characterCheck = characterValidator(characterCheck);
    if (characterCheck.error) {
      res.status(400).send({ message: characterCheck.error });
      return;
    }
    const response = await mongodb.getDb().db('genshinImpact').collection('characters').replaceOne({ _id: characterId }, character);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the character.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteCharacter = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    if (!characterId) {
      res.status(400).send({ message: 'Invalid character ID supplied.' });
      return;
    }
    const response = await mongodb.getDb().db('genshinImpact').collection('characters').deleteOne({ _id: characterId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the character.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the character.');
  }
};

// Exports
module.exports = { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };
