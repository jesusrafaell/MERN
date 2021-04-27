import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

  //get state context project
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //get state task
  const tasksContext= useContext(taskContext);
  const { errortask, taskactual, addTask, checkTask, getTask, updateTask, cleanFormTask } = tasksContext;

  //state form
  const [task, saveTask] = useState({
		name: ''
  });

  useEffect(() => {
		if(taskactual !== null){
			saveTask(taskactual);
		}else{
			saveTask({
			name: ''
			});
		}
  },[taskactual]);

  const {name} = task;

  if(!project) return null;
  
  //array destructuring
  const [ projectActual ] = project;

  const handleChange = e => {
		saveTask({
			...task,
			[e.target.name] : e.target.value
		});
		}

	const handleOnSubmit = e => {
		e.preventDefault();
		//validar
		if(name.trim() === '') {
			checkTask();
			return;
		}
		//EDIT OR NEW TASK
		if(taskactual === null){
			task.project = projectActual._id;
			task.state=false;
			addTask(task);
		}else{
			updateTask(task);
			cleanFormTask();
		}
		//get and filter task
		getTask(projectActual._id);
		//reset form
		saveTask({
			name: ''
		});
  }

  return (
		<div className="formulario">
			<form
			onSubmit={handleOnSubmit}
			>
				<div className="contenedor-input">
					<input 
						type="text"
						className="input-text"
						placeholder="Task Name..."
						name="name"
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div className="contenedor-input">
					<input 
						type="submit"
						className={taskactual ? "btn btn-block" : "btn btn-primario btn-submit btn-block"}
						value={taskactual ? "Edit Task" : "Add Task"}
					/>
				</div>
			</form>
			{errortask ? <p className="mensaje error">Task name is require</p> : null}
		</div>
  );
}

export default FormTask;
