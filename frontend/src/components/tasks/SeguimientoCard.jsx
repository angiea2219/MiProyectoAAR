
import { Card, Button } from "../ui";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";
import { useTareas } from "../../context/TareaContext";



function SeguimientoCard({ seguimiento }) {
  const navigate = useNavigate();
  const { deleteSeguimiento, loadSeguimiento, createSeguimiento } = useTareas();
  return (
    <Card key={seguimiento.id} className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h5 className="text-s">{seguimiento.fecha}</h5>
        <p>{seguimiento.comentario}</p>
      

      <Button onClick={() => navigate(`/tareas/seguimiento/${seguimiento.id}/edit`)}>
        <BiPencil className="text-white" />
        Editar
      </Button>

      <Button
        className="bg-red-700 hover:bg-red-600"
        onClick={async () => {
          if (window.confirm("¿Estás seguro de eliminar este registro?")) {
            deleteSeguimiento(seguimiento.id);
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

export default SeguimientoCard;
