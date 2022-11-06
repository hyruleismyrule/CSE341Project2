// *****************
// Routes - routes/characters.js
// *****************

// Imports
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const charactersController = require('../controllers/characters.js');
const validatior = require('../validation.js');
const characterValidator = validatior.characterValidation;


// Main
// GET / Read
router.get('/', charactersController.getAllCharacters);
router.get('/:id', charactersController.getCharacterById);

// POST / Create
router.post('/', characterValidator,
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            charactersController.createCharacter(req, res);
        }
    });

// PUT / Update
router.put('/:id', characterValidator,
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            charactersController.updateCharacter(req, res);
        }
    });

// DELETE
router.delete('/:id', charactersController.deleteCharacter);

// Exports
module.exports = router;
