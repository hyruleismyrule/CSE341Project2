// *****************
// Routes - routes/characters.js
// *****************

// Imports
const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters.js');

// Main
// GET / Read
router.get('/', charactersController.getAllCharacters);
router.get('/:id', charactersController.getCharacterById);

// POST / Create
router.post('/', charactersController.createCharacter);

// PUT / Update
router.put('/:id', charactersController.updateCharacter);

// DELETE
router.delete('/:id', charactersController.deleteCharacter);

// Exports
module.exports = router;
