const Task = require('../models/Task');
const Project= require('../models/Project');
const { validationResult } = require('express-validator');

//Create new task
exports.createTask = async (req, res) => {

  //check errors
  const error = validationResult(req);
  if(!error.isEmpty()) {
		return res.status(400).json({error: error.array()})
  }
  try {
		//Get project and check 
		const { project } = req.body;
		const eProject = await Project.findById(project);
		if(!eProject)
			return res.status(404).json({msg: 'Project no found'});

		//check author project
		if (eProject.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});

		//Create task
		const task = new Task(req.body);
		await task.save();
		res.json({ task });

  } catch (e) {
		console.log(e);
		res.status(500).send('Error');
  }
}


//Get tasks
exports.getTasks = async (req, res) => {
  try {
		//Get project and check 
		const { project } = req.query;
		const eProject = await Project.findById(project);
		if(!eProject)
			return res.status(404).json({msg: 'Project no found'});

		//check author project
		if (eProject.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});

		//get task for project
		const tasks = await Task.find({ project }).sort({ create: -1 });
		res.json({ tasks });
  } catch (e) {
		console.log(e);
		res.status(500).send('Error');
  }
}


//update task
exports.updateTask = async (req, res) => {
  try {
		//Get project and check 
		const { project, name, state } = req.body;
		//exist task?
		let task = await Task.findById(req.params.id);
		if(!task)
			return res.status(401).json({msg:'Task no found'});

		const eProject = await Project.findById(project);
		//check author project
		if (eProject.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});
		
		//create object of new info
		const newTask = {};
		newTask.name = name;
		newTask.state = state;
		//save task
		task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
		res.json({ task });
  } catch (e) {
		console.log(e);
		res.status(500).send('Error');
  }
}


//delete task
exports.deleteTask = async (req, res) => {
  try {
		//Get project and check 
		const { project } = req.query;
		//exist task?
		let task = await Task.findById(req.params.id);
		if(!task)
			return res.status(401).json({msg:'Task no found'});

		const eProject = await Project.findById(project);
		//check author project
		if (eProject.author.toString() !== req.user.id) 
			return res.status(401).json({msg:'no auth'});
		
		//delete
		await Task.findOneAndRemove({ _id: req.params.id });
		res.json({ msg: 'Task deleted' });
  } catch (e) {
		console.log(e);
		res.status(500).send('Error');
  }
}
