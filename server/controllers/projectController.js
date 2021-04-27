const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) {
		return res.status(400).json({error: error.array()})
  }
  
  try {
		//create  new project
		const project = new Project(req.body);
		//Save author for jsonwebtoken
		project.author = req.user.id;
		
		//save project
		project.save();
		res.json(project);
		} catch (e) {
			console.log(e);
			res.status(500).send('Server Error');
		}
}

//Get all project actual user
exports.getProjects = async (req, res) => {
  try {
		const projects = await Project.find({ author: req.user.id }).sort({ dateregister: -1 });
		res.json({ projects });
  } catch (e) {
		console.log(e);
		res.status(500).send('Error');
  }
}

//Update projects
exports.updateProjects = async (req, res) => {
  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) {
		return res.status(400).json({error: error.array()})
  }

  //get info of project
  const { name } = req.body;
  const newProject = {};

  if(name) {
		newProject.name = name;
  }
  try {
		//check id
		let project = await Project.findById(req.params.id);
		//project exists or not
		if (!project) 
			return res.status(404).json({msg: 'Project not found'});

		//check author project
		if (project.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});
		
		//update project
		project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set : newProject }, { new: true });
		res.json({project});
  } catch (e) {
		console.log(e);
		res.status(500).send('Error in server');
  }
}

//delete project
exports.deleteProject = async (req, res) => {
  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) {
		return res.status(400).json({error: error.array()})
  }
  //get info of project
  const { name } = req.body;
  const newProject = {};
  if(name) 
		newProject.name = name;

  try {
		//check id
		let project = await Project.findById(req.params.id);
		//project exists or not
		if (!project) 
			return res.status(404).json({msg: 'Project not found'});

		//check author project
		if (project.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});
		
		//delete project
		await Project.findOneAndRemove({ _id : req.params.id });
		res.json({ msg: 'Project delete' });
  } catch (e) {
		console.log(e);
		res.status(500).send('Error in server');
  }
}
