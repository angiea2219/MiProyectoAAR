import { createContext, useState, useContext } from "react";
import {
  getAllPuestosRequest,
  deletePuestoRequest,
  createPuestoRequest,
  getPuestoRequest,
  updatePuestoRequest,
} from "../api/puestos.api";

const PuestoContext = createContext();

export const usePuestos = () => {
  const context = useContext(PuestoContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro del proveedor TaskProvider");
  }
  return context;
};

export const PuestoProvider = ({ children }) => {
  const [puestos, setPuestos] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadPuestos = async () => {
    const res = await getAllPuestosRequest();
    setPuestos(res.data);
  };

  const loadPuesto = async (id_puesto) => {
    const res = await getPuestoRequest(id_puesto);
    return res.data;
  };

  const createPuesto = async (puesto) => {
    try {
      const res = await createPuestoRequest(puesto);
      setPuestos([...puestos, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deletePuesto = async (id_puesto) => {
    const res = await deletePuestoRequest(id_puesto);
    if (res.status === 204) {
      setPuestos(puestos.filter((puesto) => puesto.id_puesto !== id_puesto));
    }
  };

  const updatePuesto = async (id_puesto, puesto) => {
    try {
      const res = await updatePuestoRequest(id_puesto, puesto);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <PuestoContext.Provider
      value={{
        puestos,
        loadPuestos,
        deletePuesto,
        createPuesto,
        loadPuesto,
        errors,
        updatePuesto
      }}
    >
      {children}
    </PuestoContext.Provider>
  );
};
