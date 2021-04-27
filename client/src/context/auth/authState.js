import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import api from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
  SUCCESSFUL_REGISTER, 
  ERROR_REGISTER, 
  GET_USER, 
  SUCCESS_LOGIN, 
  ERROR_LOGIN,
  CLOSE_SESSION
} from '../../types/'; 

const AuthState = props => {

  const initState = {
		token: localStorage.getItem('token'),
		auth: null,
		user: null,
		msg: null,
		loading: true
  }

  const [ state, dispatch ] = useReducer(AuthReducer, initState);

  //functions
  const userRegister = async date => { 
		try { 
			const res = await api.post('/api/users', date) ; 
			console.log(res.data); 
			dispatch({
				type: SUCCESSFUL_REGISTER,
				payload: res.data 
			}) 
			//get user
			userAuth(); 
		} catch (e) { 
			console.log(e.response.data); 
			const alert = { 
				msg: e.response.data.msg, 
				category: 'alerta-error' 
			} 
			dispatch({ 
				type: ERROR_REGISTER, 
				payload : alert
			})
		}
 	} 

  //return user auth
  const userAuth = async () => {
		const token = localStorage.getItem('token');
		if(token){
			// TODO: func = send token for header
			tokenAuth(token);
		}
		try {
			const res = await api.get('/api/auth');
			//console.log(res);
			dispatch({
				type: GET_USER,
				payload: res.data.user
			});
		} catch (e) {
			console.log(e);
			dispatch({
				type: ERROR_LOGIN
			})
		}
  }

  //when user login
  const login = async date => {
		try {
			const res = await api.post('/api/auth', date);
			console.log(res);
			dispatch({
				type: SUCCESS_LOGIN,
				payload: res.data
			}); 
			//get user
			userAuth();
		} catch (e) { 
			console.log(e.response.data); 
			const alert = { 
				msg: e.response.data.msg, 
				category: 'alerta-error' 
			} 
			dispatch({ 
				type: ERROR_LOGIN, 
				payload : alert
			})
		}
  }

  //close user sesion
  const logout = () => {
		dispatch({
			type: CLOSE_SESSION
		})
  }

  return (
		<AuthContext.Provider
			value={{
				token: state.token,
				auth: state.auth,
				user: state.user,
				msg: state.msg,
				loading: state.loading,
				userRegister,
				login,
				userAuth,
				logout
			}}
		>{props.children}
		</AuthContext.Provider>
		)
}

export default AuthState;

