import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProjects } from "../context/ProjectContext";

function ProjectFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createProject, updateProject, loadProject, errors: projectsErrors } = useProjects();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let project;

    if (!params.id) {
      project = await createProject(data);
    } else {
      project = await updateProject(params.id, data)
    }

    if (project) {
      navigate("/projects");
    }
  });

  useEffect(() => {
    if (params.id) {
      loadProject(params.id).then((project) => {
        setValue("id_area", project.id_area);
        setValue("product_owner", project.product_owner);
        setValue("id_estado", project.id_estado);
        setValue("supervisor_it", project.supervisor_it);
        setValue("fecha_inicio", project.fecha_inicio);
        setValue("fecha_fin", project.fecha_fin);
        setValue("descripcion", project.descripcion);
      });
    }
  }, []);

  return (
    <div className="flex h-[50vh] justify-center items-center">
      <Card>
        {projectsErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        <h2 className="text-3xl font-bold my-4">
          {params.id? "Actualizar Proyecto" : "Crear Proyecto"}
        </h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="descripcion">Descripcion</Label>
          <Textarea
            type="text"
            placeholder="descripcion"
            autoFocus
            rows={3}
            {...register("descripcion")}
          ></Textarea>
          {errors.descripcion && (
            <span className="text-red-500">La descripcion es requerida</span>
          )}

          <Label htmlFor="id_area">id_area</Label>
          <Input
            type="number"
            placeholder="id_area"
            {...register("id_area", {
              required: true,
            })}
          />
          {errors.id_area && (
            <span className="text-red-500">id_area es requerida</span>
          )}

          <Label htmlFor="product_owner">Product Owner</Label>
          <Input
            type="number"
            placeholder="product_owner"
            {...register("product_owner")}
          ></Input>

          <Label htmlFor="id_estado">Estado</Label>
          <Input
            placeholder="id_estado"
            type="number"
            {...register("id_estado")}
          ></Input>
           <Label htmlFor="supervisor IT">Supervisor IT</Label>
          <Input
            type="number"
            placeholder="supervisor_it"
            {...register("supervisor_it")}
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

          <Button>{params.id ? "Actualizar Proyecto" : "Crear Proyecto"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default ProjectFormPage;
