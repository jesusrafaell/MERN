import React, { useReducer } from 'react'; 
import taskContext from './taskContext';
import TaskReducer from  './taskReducer';
import {
  TASK_PROJECT,
  ADD_TASK,
  CHECK_TASK,
  DELETE_TASK,
  TASK_UPDATE,
  TASK_ACTUAL,
  CLEAN_TASK
} from '../../types';

import api from '../../config/axios';

const TaskState = props => {
  const initialState = {
	tasksproject: [],
	errortask: false,
	taskactual: null
  }

  //dispatch & state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //CRUD
  const getTask = async project => {
	try {
	  const res = await api.get('/api/tasks', { params: {project}});
	  dispatch({
		type: TASK_PROJECT,
		payload: res.data.tasks
	  })
	} catch (e) {
	  console.log(e);
	}
  }

  const addTask = async task => {
	console.log(task)
	try {
	  const res = await api.post('/api/tasks', task)
	  console.log(res);
	  dispatch({
		type: ADD_TASK,
		payload: task
	  })
	} catch (e) {
	  console.log(e);
	}
  }

  const checkTask = () => {
	dispatch({
	  type: CHECK_TASK
	})
  }

  const deleteTask = async (id, project) => {
	try {
	  const res = await api.delete(`/api/tasks/${id}`, { params:{ project }});
	  console.log(res);
	  dispatch({
		type: DELETE_TASK,
		payload: id
	  })
	} catch (e) {
	  console.log(e);
	}
  }

  //update task and edit status
  const updateTask = async (task) => {
	console.log(task)
	try {
	  const res = await api.put(`/api/tasks/${task._id}`, task);
	  console.log(res.data);
	  dispatch({
		type: TASK_UPDATE,
		payload: res.data.task 
	  })
	} catch (e) {
	  console.log(e);
	}
  }

  const saveTaskActual = task => {
	dispatch({
	  type: TASK_ACTUAL,
	  payload: task
	});
  }

  const cleanFormTask = () => {
	dispatch({
	  type: CLEAN_TASK
	})
  }

  return (
	<taskContext.Provider
	  value={{
		tasksproject : state.tasksproject,
		errortask: state.errortask,
		taskactual: state.taskactual,
		getTask,
		addTask,
		checkTask,
		deleteTask,
		updateTask,
		saveTaskActual,
		cleanFormTask
	  }}
	>
	  {props.children}
	</taskContext.Provider>
  )
}

export default TaskState;
