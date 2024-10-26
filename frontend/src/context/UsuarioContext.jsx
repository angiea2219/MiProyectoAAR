import { createContext, useState, useContext } from "react";
import {
  getAllUsuariosRequest,
  deleteUsuarioRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
} from "../api/users.api";

const UsuarioContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro del proveedor TaskProvider");
  }
  return context;
};

export const UsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadUsuarios = async () => {
    const res = await getAllUsuariosRequest();
    setUsuarios(res.data);
  };

  const loadUsuario = async (id) => {
    const res = await getUsuarioRequest(id);
    return res.data;
  };

  const deleteUsuario= async (id) => {
    const res = await deleteUsuarioRequest(id);
    if (res.status === 204) {
      setUsuarios(usuarios.filter((usuario) => usuario.id!== id));
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      const res = await updateUsuarioRequest(id, usuario);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        loadUsuario,
        deleteUsuario,
        loadUsuarios,
        errors,
        updateUsuario
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
