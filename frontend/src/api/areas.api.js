import axios from "./axios";

export const getAllAreasRequest = () => axios.get("/areas");

export const createAreaRequest = (area) => axios.post("/areas", area);

export const deleteAreaRequest = (id_area) => axios.delete(`/areas/${id_area}`);

export const getAreaRequest = (id_area) => axios.get(`/areas/${id_area}`);

export const updateAreaRequest = (id_area, area) => axios.put(`/areas/${id_area}`, area);
