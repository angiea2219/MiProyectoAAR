import { useEffect } from "react";
import UsuarioCard from "../components/tasks/UsuarioCard";
import { useUsuarios } from "../context/UsuarioContext";

function UsuariosPage() {
  const { usuarios, loadUsuario, loadUsuarios } = useUsuarios();

  useEffect(() => {
    loadUsuarios();
  }, []);

  
  if (usuarios.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No se encontraron usuarios</h1>
    </div>
  )

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2">
      {usuarios.map((usuario) => (
        <UsuarioCard usuario={usuario} key={usuario.id} />
      ))}
    </div>
  );
}

export default UsuariosPage;
