const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) 
		return res.status(400).json({error: error.array()})
	
  //get email & password
  const { email, password } = req.body;
  try {
		//check user registered
		let user = await User.findOne({ email });
		if(!user) 
			return res.status(400).json({msg: 'User not found'})
		
		//check pass
		const passCorrect = await bcryptjs.compare(password, user.password);
		if(!passCorrect) 
			return res.status(400).send({msg: 'Password Incorret'})
		
		//create & sign JWT
		const paylod = {
			user: {
				id: user.id
			}
		};
		//sign JWT
		jwt.sign(paylod, process.env.SECRET, {
			expiresIn: 3600 //seg
		}, (err, token) => {
				if(err) throw err;
				res.json({ token });
		});
  } catch (e) {
		console.log(e);
  }
}

//get user auth
exports.userAuthed = async (req, res) => {
  try {
		const user = await User.findById(req.user.id).select('-password');
		res.json({user});
  } catch (e) {
		console.log(e);
		res.status(500).json({msg: 'Error'});
  }
}
