import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTareas } from "../context/TareaContext";

function SegFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createSeguimiento,updateSeguimiento, loadSeguimiento,  errors: tareasErrors } = useTareas();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let seguimiento;
    if (!params.id) {
      seguimiento = await createSeguimiento(data);
    } else {
      seguimiento = await updateSeguimiento(params.id, data)
    }

    if (seguimiento) {
      navigate(`/tareas/seguimientos/${seguimiento.id_tarea}`);
    }
  });


  useEffect(() => {
    if (params.id) {
        loadSeguimiento(params.id).then((seguimiento) => {
        setValue("id_tarea", seguimiento.id_tarea);
        setValue("comentario", seguimiento.comentario);
        setValue("fecha", seguimiento.fecha);
      });
    }
  }, []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tareasErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        <h2 className="text-3xl font-bold my-4">
          {params.id ? "Actualizar" : "Agregar"}
        </h2>
        <form onSubmit={onSubmit}>
            <Label htmlFor="comentario">comentario</Label>
            <Input
            type="text"
            placeholder="comentario"
            autoFocus
            {...register("comentario", {
            required: true,
            })}
            />
            {errors.comentario && (
            <span className="text-red-500">Es necesario ingresar un comentario</span>
            )}

            <Label htmlFor="id_proyecto">id_tarea</Label>
            <Input
            type="number"
            placeholder="id_tarea"
            {...register("id_tarea", {
            required: true,
            })}
            />
            {errors.id_tarea && (
            <span className="text-red-500">id_tarea es requerido</span>
            )}
            <Button>{params.id ? "Actualizar" : "Guardar"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default SegFormPage;
