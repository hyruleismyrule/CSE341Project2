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
router.use("/user", require('./user'));
// router.use("/logout", require('./logout'));
router.get("/logout", (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully yeeted out of Mordor." });
  });

// Exports
module.exports = router;
