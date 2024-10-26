import { Card, Button } from "../ui";
import { useAreas } from "../../context/AreaContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";

function AreaCard({ area }) {
  const { deleteArea } = useAreas();
  const navigate = useNavigate();

  console.log(area.id_area)
  return (
    <Card key={area.id_area} className="px-2 py-1 flex flex-col justify-center">
      <div>
        <p className="text-2xl font-bold">{area.id_area} - {area.descripcion_area}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/areas/${area.id_area}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar esta area?")) {
              deleteArea(area.id_area);
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

export default AreaCard;
