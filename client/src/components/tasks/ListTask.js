import React, { Fragment, useContext } from 'react';
import Task from './Task.js';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTask = () => {

  //get state context project
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;
  
  //get state context task
  const tasksContext= useContext(taskContext);
  const { tasksproject } = tasksContext;

  if(!project) return <h2>Select Project</h2>;
  
  //array destructuring
  const [ projectActual ] = project;

  const handleOnClick = () => {
		deleteProject(projectActual._id);
  }

  return (
		<Fragment>
			<h2>Project: {projectActual.name}</h2>
			<ul className="listado-tareas">
				{tasksproject.length === 0 
					? (<li className="tarea"><p>You don't have task</p></li>)
					: 
					<TransitionGroup>
						{tasksproject.map(task => (
						<CSSTransition
							key={task._id}
							timeout={200}
							classNames="tarea"
						>
							<Task 
								task={task}
							/>
						</CSSTransition>
						))}
					</TransitionGroup>
				}
			</ul>
			<button
			type="button"
			className="btn btn-delete"
			onClick={handleOnClick}
			>Delete Project &times;</button>
		</Fragment>
  );
};

export default ListTask;
