// ***************
// Routes - routes/index.js
// ***************

// Imports
const express = require('express');
const router = express.Router();

// Main
router.use('/api/characters', require('./characters'));
router.use('/api/weapons', require('./weapons'));

// Exports
module.exports = router;
