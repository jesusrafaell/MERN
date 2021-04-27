//routers for auth user
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Login
//api/auth
router.post('/', 
  authController.authUser
);

//Get user auth
router.get('/',
  auth,
  authController.userAuthed
);

module.exports = router;
