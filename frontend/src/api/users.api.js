import axios from "./axios";

export const getAllUsuariosRequest = () => axios.get("/usuarios");

export const createUsuarioRequest = (usuario) => axios.post("/usuarios", usuario);

export const deleteUsuarioRequest = (id) => axios.delete(`/usuarios/${id}`);

export const getUsuarioRequest = (id) => axios.get(`/usuarios/${id}`);

export const updateUsuarioRequest = (id, usuario) => axios.put(`/usuarios/${id}`, usuario);
