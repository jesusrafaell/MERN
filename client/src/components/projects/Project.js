import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
  //get state context
  const projectsContext = useContext(projectContext);
  const { projectActual } = projectsContext;

  //get state context task
  const tasksContext= useContext(taskContext);
  const { getTask } = tasksContext;

  //funct add proyect actual
  const selectProject = id => {
    projectActual(id);
    getTask(id);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => selectProject(project._id)}
      >{project.name}</button>
    </li>
  );
}

export default Project;
