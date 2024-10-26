import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTareas } from "../context/TareaContext";

function TareaFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createTarea, updateTarea, loadTarea, loadTareas, errors: tareasErrors } = useTareas();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let tarea;
    console.log(params.id_tarea);
    if (!params.id_tarea) {
      tarea = await createTarea(data);
    } else {
      tarea = await updateTarea(params.id_tarea, data)
    }

    if (tarea) {
      navigate("/tareas");
    }
  });


  useEffect(() => {
    if (params.id_tarea) {
        loadTarea(params.id_tarea).then((tarea) => {
        setValue("descripcion", tarea.descripcion);
        setValue("id_proyecto", tarea.id_proyecto);
        setValue("id_user", tarea.id_user);
        setValue("id_estado", tarea.id_estado);
        setValue("fecha_inicio", tarea.fecha_inicio);
        setValue("fecha_fin", tarea.fecha_fin);
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
          {params.id_tarea ? "Actualizar Tarea" : "Crear Tarea"}
        </h2>
        <form onSubmit={onSubmit}>
            <Label htmlFor="descripcion">Descripcion</Label>
            <Input
            type="text"
            placeholder="Descripcion"
            autoFocus
            {...register("descripcion", {
            required: true,
            })}
            />
            {errors.descripcion && (
            <span className="text-red-500">Descripcion es requerida</span>
            )}

            <Label htmlFor="id_proyecto">id_proyecto</Label>
            <Input
            type="number"
            placeholder="id_proyecto"
            {...register("id_proyecto", {
            required: true,
            })}
            />
            {errors.id_proyecto && (
            <span className="text-red-500">id_proyecto es requerido</span>
            )}

            <Label htmlFor="id_user">id_user</Label>
            <Input
            type="number"
            placeholder="id_user"
            {...register("id_user")}
            />

            <Label htmlFor="id_estado">Estado</Label>
            <Input
            placeholder="id_estado"
            type="number"
            {...register("id_estado")}
            ></Input>

            <Label htmlFor="fecha_inicio">Fecha Inicio</Label>
            <Input
            type="date"
            placeholder="fecha_inicio"
            {...register("fecha_inicio")}
            ></Input>

            <Label htmlFor="fecha_fin">Fecha Fin</Label>
            <Input
            type="date"
            placeholder="fecha_fin"
            {...register("fecha_fin")}
            ></Input>

            <Button>{params.id_tarea ? "Actualizar Tarea" : "Crear Tarea"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default TareaFormPage;
