import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUsuarios } from "../context/UsuarioContext";

function UsuarioFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { updateUsuario, loadUsuario, loadUsuarios, errors: usuariosErrors } = useUsuarios();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let usuario;
    console.log(params.id);
    if (!params.id) {
      usuario = await updateUsuario(params.id, data)
    } else {
      usuario = await updateUsuario(params.id, data)
    }

    if (usuario) {
      navigate("/usuarios");
    }
  });


  useEffect(() => {
    if (params.id) {
        loadUsuario(params.id).then((usuario) => {
        setValue("name", usuario.name);
        setValue("email", usuario.email);
        setValue("id_puesto", usuario.id_puesto);
        setValue("id_estado", usuario.id_estado);
      });
    }
  }, []);

  
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {usuariosErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        <h2 className="text-3xl font-bold my-4">
          {params.id ? "Actualizar" : "/"}
        </h2>
        <form onSubmit={onSubmit}>
            <Label htmlFor="name">Nombre</Label>
            <Input
            type="text"
            placeholder="name"
            autoFocus
            {...register("name", {
            required: true,
            })}
            />
            {errors.name && (
            <span className="text-red-500">Nombre es requerida</span>
            )}

            <Label htmlFor="email">email</Label>
            <Input
            type="text"
            placeholder="email"
            {...register("email", {
            required: true,
            })}
            />
            {errors.email && (
            <span className="text-red-500">El Email es requerido</span>
            )}

            <Label htmlFor="id_puesto">id_puesto</Label>
            <Input
            type="number"
            placeholder="id_puesto"
            {...register("id_puesto", )}
            />

            <Label htmlFor="id_estado">id_estado</Label>
            <Input
            type="number"
            placeholder="id_estado"
            {...register("id_estado")}
            />

            <Button>{params.id ? "Actualizar":'/'}</Button>
        </form>
      </Card>
    </div>
  );
}

export default UsuarioFormPage;
