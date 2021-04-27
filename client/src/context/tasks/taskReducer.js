import {
  TASK_PROJECT,
  ADD_TASK,
  CHECK_TASK,
  DELETE_TASK,
  TASK_UPDATE,
  TASK_ACTUAL,
  CLEAN_TASK
} from '../../types';

export default (state, action) => {
  switch(action.type) {
	case TASK_PROJECT:
	  return {
		...state,
		tasksproject: action.payload
	  }
	case ADD_TASK:
	  return {
		...state,
		tasksproject: [...state.tasksproject, action.payload ],
		errortask: false
	  }
	case CHECK_TASK:
	  return {
		...state,
		errortask: true
	  }
	case DELETE_TASK:
	  return {
		...state,
		tasksproject: state.tasksproject.filter(task => task._id !== action.payload)
	  }
	case TASK_UPDATE:
	  return{
		...state,
		tasksproject:  state.tasksproject.map(task => task._id === action.payload._id ? action.payload : task) 
	  }
	case TASK_ACTUAL:
	  return {
		...state,
		taskactual: action.payload
	  }
	case CLEAN_TASK:
	  return {
		...state,
		taskactual: null
	  }
	default:
	  return state;
  }
}
