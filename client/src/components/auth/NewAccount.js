import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = (props) => {

  //get date context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, auth, userRegister } = authContext;

  //When user ready auth or register or duplicate register
  useEffect(() => {
		if(auth)
			props.history.push('/projects');

		if(msg)
			showAlert(msg.msg, msg.category);
		//eslint-disable-next-line
  }, [msg, auth, props.history])

  //states
  const [user, saveUser] = useState({
		username: '',
		email: '',
		password: '',
		checkpass: ''
  });

  //extrar del registro
  const {username, email, password, checkpass} = user;

  const onChange = e => {
		saveUser({
			...user,
			[e.target.name] : e.target.value
		});
  } 

  const onSubmit = e => {
		e.preventDefault();
		//validar
		if(username.trim() === '' || email.trim() === '' || password.trim() === '' || checkpass.trim() === '') {
			showAlert('All fields are required', 'alerta-error');
			return;
		}
		//pass minimo 6 char
		if(password.length < 6) {
			showAlert('Password must be at least 6 characters', 'alerta-error');
			return;
		}
		//password = checkpass
		if(password !== checkpass){
			showAlert('passwords must be the same', 'alerta-error');
			return;
		}
		//registrar (pasarlo al action)
		userRegister({
			username,
			email,
			password
		});
  }

  return (
		<div className="form-usuario">
			{ alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null }
			<div className="contenedor-form sombra-dark">
				<h1>Register</h1>
				<form
					onSubmit={onSubmit}
				>
					<div className="campo-form">
						<label htmlFor="text">Username</label>
						<input 
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={username}
							onChange={onChange}
						/>
					</div>
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
						<label htmlFor="checkpass">Confirm Password</label>
						<input 
							type="password"
							id="checkpass"
							name="checkpass"
							placeholder="*******"
							value={checkpass}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input type="submit" className="btn btn-primario btn-block" value="Register" />
					</div>
				</form>
				<Link to={'/'} className="enlace-cuenta">
					Login
				</Link>
			</div>
		</div>
  );
}

export default NewAccount;
