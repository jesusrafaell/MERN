import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

  //get state context
  const projectsContext = useContext(projectContext);
  const { form, errorForm, showForm, addProject, showError } = projectsContext;

  //state
  const [project, saveProject] = useState({
		name: ''
  });
  
  //extraer project
  const {name} = project

  const onChange = e => {
		saveProject({
			...project,
			[e.target.name] : e.target.value
		});
  }

  const onSubmit = e => {
		e.preventDefault();
		//validar
		if(name === ''){
			showError();
			return;
		}
		//add to state
		addProject(project);
		//reiniciar el form
		saveProject({
			name: ''
		});
  }

  return (
		<Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={() => showForm()}
			>New Proyect</button>
			{form ?
			(
				<form 
					className="formulario-nuevo-proyecto"
					onSubmit={onSubmit}
				>
					<input
						type="text"
						className="input-text"
						placeholder="Proyect Name"
						name="name"
						value={name}
						onChange={onChange}
					/>
					<input
						type="submit"
						className="btn btn-primario btn-block"
						value="Add Proyect"
					/>
				</form>
			) : null }
			{errorForm ? 
				<p className="mensaje error">Name Project is require</p>
			: null}
		</Fragment>
  );
};

export default NewProject;
