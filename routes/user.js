const { Router } = require("express");
// const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");
const router = Router();

console.log("user router");
router.use([loadUser]);

// router.get("/")

module.exports = router;