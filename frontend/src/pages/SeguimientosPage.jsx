import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useEffect } from "react";
import SeguimientoCard from "../components/tasks/SeguimientoCard";
import { useTareas } from "../context/TareaContext";
import { useNavigate, useParams } from "react-router-dom";
import { BiPlus  } from "react-icons/bi";

function SeguimientosPage() {
  const { seguimientos, loadSegTarea, deleteSeguimiento} = useTareas();
  const navigate = useNavigate();
  useEffect(() => {
    loadSegTarea();
  }, []);
  
  if (seguimientos.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No tasks found</h1>
    </div>
  )   

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
      {seguimientos.map((seguimiento) => (
        <SeguimientoCard seguimiento={seguimiento} key={seguimiento.id} />
      ))}
      <br />
       <Button onClick={() => navigate("/tareas/seguimientos/new")}>
        <BiPlus className="text-white" />
        Agregar
      </Button>

    </div>


  );
}

export default SeguimientosPage;
