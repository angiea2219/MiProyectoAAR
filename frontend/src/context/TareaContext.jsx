import { createContext, useState, useContext } from "react";
//import ProjectContext from "./ProjectContext"
import {
  getAllTareasRequest,
  deleteTareaRequest,
  createTareaRequest,
  getTareaRequest,
  updateTareaRequest,
  //SEGUIMIENTOS
  getSegTareaRequest,
  createSeguimientoRequest,
  deleteSeguimientoRequest,
  updateSeguimientoRequest,
  getSeguimientoRequest,
  getTareasProyectoRequest,
  //getAllMyTasks2Request,
} from "../api/tareas.api";

const TareaContext = createContext();

export const useTareas = () => {
  const context = useContext(TareaContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro del proveedor Task2Provider");
  }
  
  return context;
};

export const TareaProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [errors, setErrors] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);

  const loadTareas = async () => {
    const res = await getAllTareasRequest();
    setTareas(res.data);
  };

  
  const loadTareasProyecto = async (id_proyecto) => {
    const res = await getTareasProyectoRequest(id_proyecto);
    return res.data;
    //console.log(res.data);
    //setTareas(res.data);
  };
  
  
  const loadTarea = async (id_tarea) => {
    const res = await getTareaRequest(id_tarea);
    return res.data;
  };

 
  

  /*
  const loadMyTask2 = async (id_user) => {
    const res = await getAllMyTasks2Request(id_user);
    return res.data;
  };
*/

  const createTarea = async (tarea) => {
    try {
      const res = await createTareaRequest(tarea);
      setTareas([...tareas, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors2([error.response.data.message]);
      }
    }
  };

  const deleteTarea = async (id_tarea) => {
    const res = await deleteTareaRequest(id_tarea);
    if (res.status === 204) {
      setTareas(tareas.filter((tarea) => tarea.id_tarea !== id_tarea));
    }
  };


  const updateTarea = async (id_tarea, tarea) => {
    try {
      const res = await updateTareaRequest(id_tarea, tarea);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  //SEGUIMIENTOS  

  const loadSeguimiento = async (id) => {
    const res = await getSeguimientoRequest(id);
    return res.data;
  };


  const deleteSeguimiento = async (id) => {
    const res = await deleteSeguimientoRequest(id);
    if (res.status === 204) {
      setSeguimientos(seguimientos.filter((seguimiento) => seguimiento.id !== id));
    }
  };



  const loadSegTarea = async (id_tarea) => {
    const res = await getSegTareaRequest(id_tarea);
    setSeguimientos(res.data);
  };

  const createSeguimiento = async (seguimiento) => {
    try {
      const res = await createSeguimientoRequest(seguimiento);
      setTareas([...seguimientos, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };


  const updateSeguimiento = async (id, seguimiento) => {
    try {
      const res = await updateSeguimientoRequest(id, seguimiento);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };


  //FIN SEGUIMIENTOS

  return (
    <TareaContext.Provider
      value={{
        tareas,
        loadTarea,
        deleteTarea,
        createTarea,
        loadTareas,
        errors,
        updateTarea,
        loadTareasProyecto,
        //SEGUIMIENTOS
        loadSegTarea,
        seguimientos,
        setSeguimientos,
        deleteSeguimiento,
        createSeguimiento,
        updateSeguimiento,
        loadSeguimiento,
        
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};
