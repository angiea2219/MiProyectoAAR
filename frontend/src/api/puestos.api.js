import axios from "./axios";

export const getAllPuestosRequest = () => axios.get("/puestos");

export const createPuestoRequest = (puesto) => axios.post("/puestos", puesto);

export const deletePuestoRequest = (id_puesto) => axios.delete(`/puestos/${id_puesto}`);

export const getPuestoRequest = (id_puesto) => axios.get(`/puestos/${id_puesto}`);

export const updatePuestoRequest = (id_puesto, puesto) => axios.put(`/puestos/${id_puesto}`, puesto);
