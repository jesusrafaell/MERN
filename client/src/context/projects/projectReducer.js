import { 
  FORM_PROJECT, 
  GET_PROJECTS,
  ADD_PROJECT,
  ERROR_PROJECT,
  CHECK_FORM,
  PROJECT_ACTUAL,
  EXIT_PROJECT,
  DELETE_PROJECT
} from '../../types';

export default (state, action) => {
  switch(action.type) {
	case FORM_PROJECT:
	  if(state.newProject){
		return {
		  ...state,
		  newProject: false
		}
	  }
	  return {
		...state,
		newProject: true
	  }
	case GET_PROJECTS:
	  return {
		...state,
		projects: action.payload
	  }
	case ADD_PROJECT:
	  return {
		...state,
		projects: [action.payload, ...state.projects],
		newProject: false,
		errorForm: false
	  }
	case CHECK_FORM:
	  return {
		...state,
		errorForm: true
	  }
	case PROJECT_ACTUAL:
	  return {
		...state,
		project: state.projects.filter(project => project._id === action.payload)
	  }
	case EXIT_PROJECT:
	  return {
		...state,
		project: null  
	  }
	case DELETE_PROJECT:
	  return {
		...state,
		projects: state.projects.filter(project => project._id !== action.payload),
		project: null
	  }
	case ERROR_PROJECT:
	  return {
		...state,
		msg: action.payload
	  }
	default:
	  return state;
  }
}
