const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");

router.get('/', userController.getUserCharacters);

router.use([loadUser]);

// router.get("/")

module.exports = router;