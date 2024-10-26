import { Card, Button, Textarea} from "../ui";
import { useTareas } from "../../context/TareaContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";
import { useEffect } from "react";
import SeguimientoCard from "./SeguimientoCard";

function TareasCard({ tarea }) {
  const { deleteTarea, loadSegTarea, loadTarea,seguimientos } = useTareas();
  
  const navigate = useNavigate();

  useEffect(() => {
    loadSegTarea(tarea.id_tarea);
    //loadTarea();
  }, []);



  /*
  <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-1" >
         {seguimientos.map((seguimiento) => (
          <SeguimientoCard seguimiento={seguimiento} key={seguimiento.id} />   
        ))}
    </div>
  
  */

  return (
    <Card key={tarea.id_tarea} className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h5>Datos de tarea</h5>
        <h1 className="text-2xl font-bold">{tarea.descripcion}</h1>
        <p>{tarea.id_tarea}</p>
        <p>{tarea.proyecto}</p>
        <p>{tarea.usuario}</p>
        <p>{tarea.estado}</p>
        <p itemType="date">{tarea.fecha_inicio}</p>
        <p itemType="date">{tarea.fecha_fin}</p>

      </div>

      
      
      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/tareas/seguimientos/${tarea.id_tarea}`)}>
          <BiPencil className="text-yellow" />
          Ver Seguimiento
        </Button>
      
        <Button onClick={() => navigate(`/tareas/${tarea.id_tarea}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        
        

        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
              deleteTarea(tarea.id_tarea);
            }
          }}
        >
          <PiTrashSimpleLight className="text-white" />
          Eliminar
        </Button>
      </div>
    
     
    </Card>
    


  );
}

export default TareasCard;
