import { z } from "zod";

export const createTaskS2chema = z.object({
  id_proyecto: z
    .number({
      required_error: "El id del proyecto para esta tarea, es requerido",
      invalid_type_error: "El titulo debe ser un numero",
    }),
  id_user: z
    .number({
      required_error: "El id del usuario de asignacion es necesario",
      invalid_type_error: "El user_id debe ser un numero",
    })
    .optional(),
    id_estado: z
    .number({
      required_error: "El id del estado es necesario",
      invalid_type_error: "El user_id debe ser un numero",
    })
    .optional(),
});

export const updateTask2Schema = z.object({
    id_proyecto: z
    .number({
      required_error: "El id del proyecto para esta tarea, es requerido",
      invalid_type_error: "El titulo debe ser un numero",
    }),
  id_user: z
    .number({
      required_error: "El id del usuario de asignacion es necesario",
      invalid_type_error: "El user_id debe ser un numero",
    })
    .optional(),
    id_estado: z
    .number({
      required_error: "El id del estado es necesario",
      invalid_type_error: "El user_id debe ser un numero",
    })
    .optional(),
});


