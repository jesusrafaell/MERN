import { 
  SUCCESSFUL_REGISTER, 
  ERROR_REGISTER, 
  GET_USER, 
  SUCCESS_LOGIN, 
  ERROR_LOGIN,
  CLOSE_SESSION
} from '../../types/';

export default (state, action) => {
  switch(action.type) {
		case SUCCESS_LOGIN:
		case SUCCESSFUL_REGISTER:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				auth: true,
				msg: null,
				loading: false
			}
		case GET_USER:
			return {
				...state,
				auth: true,
				user: action.payload,
				loading: false
			}
		case CLOSE_SESSION:
		case ERROR_LOGIN:
		case ERROR_REGISTER:
			return {
				...state,
				token: null,
				user: null,
				auth: null,
				msg: action.payload,
				loading: false
			}
		default:
			return state;
  }
}
