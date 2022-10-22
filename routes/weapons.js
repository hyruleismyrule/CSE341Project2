// *****************
// Routes - routes/weapons.js
// *****************

// Imports
const express = require('express');
const router = express.Router();
// const { check } = require('express-validator');
const { check, validationResult } = require('express-validator');
const weaponsController = require('../controllers/weapons.js');
const validatior = require('../validation.js');
const weaponValidator = validatior.weaponValidation;

// Main
// GET / Read
router.get('/', weaponsController.getAllWeapons);
router.get('/:id', weaponsController.getWeaponById);

// POST / Create
// router.post('/', weaponsController.createWeapon);
router.post('/', weaponValidator,
    function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            weaponsController.createWeapon(req, res);
        }
    });

// PUT / Update
// router.put('/:id', weaponsController.updateWeapon);
router.put('/:id', weaponValidator,
    function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            weaponsController.updateWeapon(req, res);
        }
    });

// DELETE
router.delete('/:id', weaponsController.deleteWeapon);

// Exports
module.exports = router;
