import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePuestos } from "../context/PuestoContext";
import PuestoCard from "../components/tasks/PuestoCard";
import { BiPlus  } from "react-icons/bi";

  function PuestosPage() {
    const navigate = useNavigate();
    const { puestos, loadPuestos } = usePuestos();
  
    useEffect(() => {
      loadPuestos();
    }, []);
  
    if (puestos.length === 0) return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <h1 className="text-3xl font-bold">No se encontraron Puestos</h1>
      </div>
    )
  
    return (
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-2">
        {puestos.map((puesto) => (
          <PuestoCard puesto={puesto} key={puesto.id_puesto} />
        ))}
        <Button onClick={() => navigate(`/puestos/new`)}>
          <BiPlus alignmentBaseline="center"  className="text-white" />
          Agregar
        </Button>
      </div>
    );
  }


export default PuestosPage;
