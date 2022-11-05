const express = require('express');
const router = express.Router();
// const userController = require('../controllers/user.js');
const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");

router.get('/', userController.getUserCharacters);

// console.log("user router");
router.use([loadUser]);

// router.get("/")

module.exports = router;