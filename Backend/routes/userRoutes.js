const express = require('express');
const router = express.Router();
const User = require("../models/user")


// 2 handlers required -> for Login, for Signup

const { login, signup, profile, changeProfilePassword } = require('../controllers/user');




const {auth} = require("../middlewares/voting");


router.post('/login', login);
router.post('/signup', signup);
router.get('/profile', auth, profile);
router.put('/profile/password', auth, changeProfilePassword);



module.exports = router;