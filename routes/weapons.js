// *****************
// Routes - routes/weapons.js
// *****************

// Imports
const express = require('express');
const router = express.Router();

const weaponsController = require('../controllers/weapons.js');

// Main
// GET / Read
router.get('/', weaponsController.getAllWeapons);
router.get('/:id', weaponsController.getWeaponById);

// POST / Create
router.post('/', weaponsController.createWeapon);

// PUT / Update
router.put('/:id', weaponsController.updateWeapon);

// DELETE
router.delete('/:id', weaponsController.deleteWeapon);

// Exports
module.exports = router;
