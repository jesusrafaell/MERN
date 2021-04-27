const express = require('express');
const router = express.Router();
const taskController  = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//create task
//api/task
router.post('/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('project', 'Project is required').not().isEmpty()
  ],
  taskController.createTask
);

//get task for project
router.get('/',
  auth,
  taskController.getTasks
);


//update task 
router.put('/:id',
  auth,
  taskController.updateTask
);

//delete task 
router.delete('/:id',
  auth,
  taskController.deleteTask
);

module.exports = router;
