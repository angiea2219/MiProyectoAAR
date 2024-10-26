import { createContext, useState, useContext } from "react";
import {
  getAllAreasRequest,
  deleteAreaRequest,
  createAreaRequest,
  getAreaRequest,
  updateAreaRequest,
} from "../api/areas.api";

const AreaContext = createContext();

export const useAreas = () => {
  const context = useContext(AreaContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro del proveedor TaskProvider");
  }
  return context;
};

export const AreaProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadAreas = async () => {
    const res = await getAllAreasRequest();
    setAreas(res.data);
  };

  const loadArea = async (id_area) => {
    const res = await getAreaRequest(id_area);
    return res.data;
  };

  const createArea = async (area) => {
    try {
      const res = await createAreaRequest(area);
      setAreas([...areas, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deleteArea = async (id_area) => {
    const res = await deleteAreaRequest(id_area);
    if (res.status === 204) {
      setAreas(areas.filter((area) => area.id_area !== id_area));
    }
  };

  const updateArea = async (id_area, area) => {
    try {
      const res = await updateAreaRequest(id_area, area);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <AreaContext.Provider
      value={{
        areas,
        loadAreas,
        deleteArea,
        createArea,
        loadArea,
        errors,
        updateArea
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};
