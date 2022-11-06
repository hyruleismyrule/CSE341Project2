// ******************
// Logout

// Imports
const express = require('express');
const router = express.Router();
const authorizationRoutes = require("./authorization");


app.get("/logout", authorization, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  });