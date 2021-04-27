//routers for create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

//Create User
//api/users
router.post('/', 
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'enter a valid email').isEmail(),
    check('password', 'the password must have a minimum of 6 characters').isLength({min: 6})
  ],
  userController.createUser
);

module.exports = router;
