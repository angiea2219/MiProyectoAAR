import { createContext, useState, useContext } from "react";
import {
  getAllProjectsRequest,
  deleteProjectRequest,
  createProjectRequest,
  getProjectRequest,
  updateProjectRequest,
  getTareasProyectoRequest,
} from "../api/projects.api";

export const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
 /* if (!context) {
    throw new Error("useProjects debe estar dentro de un perfil de owner o supervisor");
  }
    */
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadProjects = async () => {
    const res = await getAllProjectsRequest();
    setProjects(res.data);
  };

  const loadProject = async (id) => {
    const res = await getProjectRequest(id);
    return res.data;
  };

  const createProject = async (project) => {
    try {
      const res = await createProjectRequest(project);
      setProjects([...projects, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deleteProject = async (id) => {
    const res = await deleteProjectRequest(id);
    if (res.status === 204) {
      setProjects(projects.filter((project) => project.id_proyecto !== id));
    }
  };

  const updateProject = async (id, project) => {
    try {
      const res = await updateProjectRequest(id, project);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const loadTareasProyecto = async (id_proyecto) => {
    console.log('fdfadfad',id_proyecto)
    const res = await getTareasProyectoRequest(id_proyecto);
    console.log()
    return res.data;
    
  };



  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadProjects,
        deleteProject,
        createProject,
        loadProject,
        errors,
        updateProject,
        loadTareasProyecto,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
