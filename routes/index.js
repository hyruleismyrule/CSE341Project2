// ***************
// Routes - routes/index.js
// ***************

// Imports
const express = require('express');
const router = express.Router();
const authorizationRoutes = require("./authorization");

// Main
router.use('/api/characters', require('./characters'));
router.use('/api/weapons', require('./weapons'));
router.use("/authorization", authorizationRoutes);

// Exports
module.exports = router;
