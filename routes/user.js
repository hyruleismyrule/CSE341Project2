const { Router } = require("express");
// const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");
const router = Router();


router.use([loadUser]);

// router.get("/")

module.exports = router;