import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

  //get date context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, auth, login } = authContext;

  //when user or pass no exist
  useEffect(() => {
		if(auth)
			props.history.push('/projects');

		if(msg)
			showAlert(msg.msg, msg.category);
		//eslint-disable-next-line
  }, [msg, auth, props.history])

  //State para iniciar sesion
  const [user, saveUser] = useState({
		email: '',
		password: ''
  });

  //extrar del usuario
  const {email, password} = user;

  const onChange = e => {
		saveUser({
			...user,
			[e.target.name] : e.target.value
		});
  }

  //Send Login
  const onSubmit = e => {
		e.preventDefault();
		//validar info
		if(email.trim() === '' || password.trim() === '')
			showAlert('All fields are required', 'alerta-error');
		
		//pasar la info
		login({email, password});
  }

  return (
		<div className="form-usuario">
			{ alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null }
			<div className="contenedor-form sombra-dark">
				<h1>Login</h1>
				<form
					onSubmit={onSubmit}
				>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input 
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input 
							type="password"
							id="password"
							name="password"
							placeholder="*******"
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input type="submit" className="btn btn-primario btn-block" value="login"/>
					</div>
				</form>
				<Link to={'/newaccount'} className="enlace-cuenta">
					Register Now
				</Link>
			</div>
		</div>
  );
}

export default Login;
