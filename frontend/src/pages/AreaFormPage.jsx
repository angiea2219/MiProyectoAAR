import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAreas } from "../context/AreaContext";



function AreaFormPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm();
    const navigate = useNavigate();
    const { createArea, updateArea, loadArea, errors: areasErrors } = useAreas();
    const params = useParams();
  
    const onSubmit = handleSubmit(async (data) => {
      let area;
  
      if (!params.id_area) {
        area = await createArea(data);
      } else {
        area = await updateArea(params.id_area, data)
      }
  
      if (area) {
        navigate("/areas");
      }
    });
  
    
    useEffect(() => {
      if (params.id_area) {
        loadArea(params.id_area).then((area) => {
          setValue("id_area", area.id_area);
          setValue("descripcion_area", area.descripcion_area);
        });
      }
    }, []);
  
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <Card>
          {areasErrors.map((error, i) => (
            <p className="text-red-500" key={i}>
              {error}
            </p>
          ))}
          <h2 className="text-3xl font-bold my-4">
            {params.id_area ? "Actualizar" : "Crear Area"}
          </h2>
          <form onSubmit={onSubmit}>
            <Label htmlFor="id_area">id_area</Label>
            <Input
              type="number"
              placeholder="id_area"
              autoFocus
              {...register("id_area", {
                required: true,
              })}
            />
            {errors.id_area && (
              <span className="text-red-500">id de area es requerido</span>
            )}
  
            <Label htmlFor="descripcion_area">Descripcion</Label>
            <Textarea
              placeholder="descripcion_area "
              rows={3}
              {...register("descripcion_area")}
            ></Textarea>
  
            <Button>{params.id_area ? "Actualizar" : "Crear Area"}</Button>
          </form>
        </Card>
      </div>
    );
  }

  export default AreaFormPage;
