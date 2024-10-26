import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePuestos } from "../context/PuestoContext";



function PuestoFormPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm();
    const navigate = useNavigate();
    const { createPuesto, updatePuesto, loadPuesto, errors: puestosErrors } = usePuestos();
    const params = useParams();
  
    const onSubmit = handleSubmit(async (data) => {
      let puesto;
  
      if (!params.id_puesto) {
        puesto = await createPuesto(data);
      } else {
        puesto = await updatePuesto(params.id_puesto, data)
      }
  
      if (puesto) {
        navigate("/puestos");
      }
    });
  
    
    useEffect(() => {
      if (params.id_puesto) {
        loadPuesto(params.id_puesto).then((puesto) => {
          setValue("id_puesto", puesto.id_puesto);
          setValue("nombre", puesto.nombre);
          setValue("descripcion", puesto.descripcion);
          setValue("estado", puesto.estado);
        });
      }
    }, []);
  
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <Card>
          {puestosErrors.map((error, i) => (
            <p className="text-red-500" key={i}>
              {error}
            </p>
          ))}
          <h2 className="text-3xl font-bold my-4">
            {params.id_puesto ? "Actualizar" : "Crear Puesto"}
          </h2>
          <form onSubmit={onSubmit}>
            <Label htmlFor="id_puesto">id_puesto</Label>
            <Input
              type="number"
              placeholder="id_puesto"
              autoFocus
              {...register("id_puesto", {
                required: true,
              })}
            />
            {errors.id_puesto && (
              <span className="text-red-500">id del puesto es requerido</span>
            )}
  
            <Label htmlFor="nombre">Nombre</Label>
            <Textarea
              placeholder="nombre"
              rows={1}
              {...register("nombre")}
            ></Textarea>

            <Label htmlFor="descripcion"></Label>
            <Textarea
              placeholder="descripcion"
              rows={3}
              {...register("descripcion")}
            ></Textarea>

            <Label htmlFor="estado">estado</Label>
            <Input
              type="number"
              placeholder="estado"
              autoFocus
              {...register("estado", {
                required: true,
              })}
            />
            {errors.estado && (
              <span className="text-red-500">El Estado del puesto es requerido y debe ser un numero</span>
            )}
  
            <Button>{params.id_puesto ? "Actualizar" : "Crear Puesto"}</Button>
          </form>
        </Card>
      </div>
    );
  }

  export default PuestoFormPage;
