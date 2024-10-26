import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAreas } from "../context/AreaContext";
import AreaCard from "../components/tasks/AreaCard";
import { BiPlus  } from "react-icons/bi";

  function AreasPage() {
    const navigate = useNavigate();
    const { areas, loadAreas } = useAreas();
  
    useEffect(() => {
        loadAreas();
    }, []);
  
    if (areas.length === 0) return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <h1 className="text-3xl font-bold">No se encontraron Areas</h1>
      </div>
    )
  
    return (
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-2">
        {areas.map((area) => (
          <AreaCard area={area} key={area.id_area} />
        ))}
        <Button onClick={() => navigate(`/areas/new`)}>
          <BiPlus alignmentBaseline="center"  className="text-white" />
          Agregar
        </Button>
      </div>
    );
  }


export default AreasPage;
