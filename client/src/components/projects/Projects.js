import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

  //extract info from auth
  const authToken = useContext(AuthContext);
  const { userAuth } = authToken; 

  useEffect(() => {
		userAuth();
		//eslint-disable-next-line
  }, [])

  return (
		<div className="contenedor-app">
			<Sidebar />
			<div className="seccion-principal">
				<Bar />
				<main>
					<FormTask />
					<div className="contenedor-tareas">
						<ListTask />
					</div>
				</main>
			</div>
		</div>
  );
}

export default Projects;

