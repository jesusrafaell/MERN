import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {
  
  //extract info from auth
  const authToken = useContext(AuthContext);
  const { user, userAuth, logout } = authToken; 

  useEffect(() => {
		userAuth();
		//eslint-disable-next-line
  }, [])


  return (
		<header className="app-header">
			{user ?  <p className="nombre-usuario">Hello <span>{user.username}</span></p> : null}
			<nav className="nav-principal"> 
				<button
					className="btn btn-blank cerrar-sesion"
					onClick={ () => logout() }
				>Logout</button>
			</nav>
		</header>
  );
}

export default Bar;
