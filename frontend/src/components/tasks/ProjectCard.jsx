import { Card, Button } from "../ui";
import { useProjects } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";
//import { getTareasProyectoRequest } from "../../api/tareas.api";
import { getTareasProyectoRequest } from "../../api/projects.api";
//import { loadTareasProyecto } from "../../context/ProjectContext.jsx";

function ProjectCard({ project }) {
  const { deleteProject, loadTareasProyecto } = useProjects();
  const navigate = useNavigate();
  //console.log('>>>>> proyecto:', project)
  
  async function  handleTasks (){
    console.log('>>>>> - id_proyecto>', project.id_proyecto)
   //const result = await getTareasProyectoRequest(project.id_proyecto)
   const result = await loadTareasProyecto(project.id_proyecto)

  //  console.log('>>>>> result:', result)
  }


  return (
    <Card key={project.id_proyecto} className="px-10 py- flex flex-col justify-center">
      <div>
        <h1 className="text-2xl font-bold">{project.descripcion}</h1>
        <p>id proyecto: {project.id_proyecto}</p>
        <p>area: { project.area}</p>
        <p>Owner: {project.po}</p>
        <p>Estado: {project.estado}</p>
        <p>Supervisor IT: {project.sup}</p>
        <p>Fecha inicio: {project.fecha_inicio}</p>
        <p>Fecha Fin: {project.fecha_fin}</p>
      </div>

      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/projects/${project.id_proyecto}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
              deleteProject(project.id_proyecto);
            }
          }}
        >
          <PiTrashSimpleLight className="text-white" />
          Eliminar
        </Button>

        <Button onClick={() =>{
          //console.log('>>> on click --- ' ,project.id_proyecto)
         // loadTareasProyecto(project.id_proyecto)
          //handleTasks()
          navigate(`/tareas/tareas_proyecto/${project.id_proyecto}`)
          }}>
          <BiPencil className="text-white" />
          Ver Tareas
        </Button>  

      </div>
    </Card>
  );
}

export default ProjectCard;
