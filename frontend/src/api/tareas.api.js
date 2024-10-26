import axios from "./axios";

export const getAllTareasRequest = () => axios.get("/tareas");

export const createTareaRequest = (tarea) => axios.post("/tareas", tarea);

export const deleteTareaRequest = (id_tarea) => axios.delete(`/tareas/${id_tarea}`);

export const getTareaRequest = (id_tarea) => axios.get(`/tareas/${id_tarea}`);

export const updateTareaRequest = (id_tarea, tarea) => axios.put(`/tareas/${id_tarea}`, tarea);

export const getTareasProyectoRequest = (id_proyecto) => axios.get(`/tareas/tareas_proyecto/${id_proyecto}`);

export const getSegTareaRequest = (id_tarea) => axios.get(`/tareas/seguimientos/${id_tarea}`);

export const deleteSeguimientoRequest = (id) => axios.delete(`/tareas/seguimientos/${id}`);

export const createSeguimientoRequest = (seguimiento) => axios.post("/tareas/seguimientos", seguimiento);

export const updateSeguimientoRequest = (id, seguimiento) => axios.put(`/tareas/seguimientos/${id}`, seguimiento);

export const getSeguimientoRequest = (id) => axios.get(`/tareas/seguimiento/${id}`);


