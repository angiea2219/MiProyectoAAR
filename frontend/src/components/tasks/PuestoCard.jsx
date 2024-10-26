import { Card, Button } from "../ui";
import { usePuestos } from "../../context/PuestoContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";

function PuestoCard({ puesto }) {
  const { deletePuesto } = usePuestos();
  const navigate = useNavigate();

  return (
    <Card key={puesto.id_puesto} className="px-2 py-1 flex flex-col justify-center">
      <div>
        <h5 className="text-2xl font-bold"> {puesto.nombre}</h5>
        <p> Id: {puesto.id_puesto}</p>
        <p> Descripcion: {puesto.descripcion}</p>
        <p> Estado: {puesto.estado}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/puestos/${puesto.id_puesto}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar este puesto?")) {
              deletePuesto(puesto.id_puesto);
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

export default PuestoCard;
