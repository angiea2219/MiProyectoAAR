import { Card, Button } from "../ui";
import { useUsuarios} from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";

function UsuarioCard({ usuario }) {
  const { deleteUsuario } = useUsuarios();
  const navigate = useNavigate();

  return (
    <Card key={usuario.id} className="px-2 py-1 flex flex-col justify-center">
      <div>
        <h5 className="text-2xl font-bold"> {usuario.name}</h5>
        <p> Id: {usuario.id}</p>
        <p> Email: {usuario.email}</p>
        <p> Puesto: {usuario.id_puesto}</p>
        <p> Estado: {usuario.id_estado}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
      
        <Button onClick={() => 
          navigate(`/usuarios/${usuario.id}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
                deleteUsuario(usuario.id);
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

export default UsuarioCard;
