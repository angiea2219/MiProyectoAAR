
import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useEffect } from "react";
import TareaCard from "../components/tasks/TareaCard";
import { useTareas } from "../context/TareaContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { BiPlus  } from "react-icons/bi";

function TareasPage() {
  const { tareas, loadTareas, loadTareasProyecto } = useTareas();
  const navigate = useNavigate();
  //const { projects, loadTareasProyecto} = useProjects();

  useEffect(() => {
  loadTareas();
  //loadTareasProyecto();
  }, []);

  
  if (tareas.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No se encontraron tareas</h1>
    </div>
  )

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2">
      {tareas.map((tarea) => (
        <TareaCard tarea={tarea} key={tarea.id_tarea} />
      ))}
    <br />  
    <Button onClick={() => navigate(`/tareas/new`)}>
      <BiPlus alignmentBaseline="center"  className="text-white" />
      Agregar
    </Button>
   
    </div>
    
  );
}

export default TareasPage;
