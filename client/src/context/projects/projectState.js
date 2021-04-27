import React, {useReducer} from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
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

import api from '../../config/axios';

const ProjectState = props => {

	const initState = {
		projects: [],
		newProject: false,
		errorForm: false,
		project: null,
		msg: null
	}

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(projectReducer, initState);

	//CRUD
	const showForm = () => {
		dispatch({
			type: FORM_PROJECT
		});
	}

	// Obtener los projectos
	const getProjects = async () => {
		try {
			const res = await api.get('/api/projects');
			dispatch({
				type: GET_PROJECTS,
				payload: res.data.projects
			});
		} catch (e) {
			const alert = {
				msg: 'Error',
				category: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})
		}
	}

	// Agregar nuevo projecto
	const addProject = async project => {
		try {
			const res = await api.post('/api/projects', project);
			console.log(res);
			//Insert project in state
			dispatch({
				type: ADD_PROJECT,
				payload: res.data
			});
		} catch (e) {
			const alert = {
				msg: 'Error',
				category: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})
		}

	}

	//valid form
	const showError = () => {
		dispatch({
			type: CHECK_FORM
		});
	}

	//select project
	const projectActual = projectId => {
		dispatch({
			type: PROJECT_ACTUAL,
			payload: projectId
		});
	}

	//close project
	const closeProject = () => {
		dispatch({
			type: EXIT_PROJECT
		});
	}

	//delete project
	const deleteProject = async projectId => {
		try {
			await api.delete(`/api/projects/${projectId}`)
			dispatch({
				type: DELETE_PROJECT,
				payload: projectId
			});
		} catch (e) {
			const alert = {
				msg: 'Error',
				category: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})
		}
	}


	return (
		<projectContext.Provider
			value={{
				projects: state.projects,
				form: state.newProject,
				errorForm: state.errorForm,
				project: state.project,
				msg: state.msg,
				showForm,
				getProjects,
				addProject,
				showError,
				projectActual,
				closeProject,
				deleteProject
			}}
		>
			{props.children}
		</projectContext.Provider>

	)
}

export default ProjectState;
