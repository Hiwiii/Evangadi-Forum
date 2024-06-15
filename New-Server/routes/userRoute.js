const express = require('express');
const router = express.Router();

// authentication middleware
const { authMiddleware , logout} = require("../middleware/authMiddleware");

// user Controllers
const {register, login, checkUser} = require('../controller/userController')

// register route 
router.post("/register", register)
// login route
router.post("/login", login)
// check user
router.get("/check", authMiddleware, checkUser)
// logout route
router.post('/logout', authMiddleware, logout);

module.exports = router




