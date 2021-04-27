const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) 
		return res.status(400).json({error: error.array()})

  //get email & password
  const { email, password } = req.body;
  try {
		let user = await User.findOne({ email });
		if(user) 
			return res.status(400).json({ msg: 'User already' })
		
		//save new user
		user = new User(req.body);
		console.log(req.body);
		//hashear pass
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(password, salt);
		//save user
		await user.save();
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
			//confirm
			res.json({ token });
		});
  } catch (e) {
		console.log(e);
		res.status(400).send('Get Error');
  }
}
