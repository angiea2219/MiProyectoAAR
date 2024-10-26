import { z } from "zod";

export const createProjectSchema = z.object({
    id_area: z
    .number({
        required_error: "El id del área es requerido",
        invalid_type_error: "El valor debe ser un número entero",
    }),
    product_owner: z
    .number({
        invalid_type_error: "el valor para product_owner debe ser un número entero",
    })
    .optional(),
    supervisor_it: z
    .number({
        invalid_type_error: "el valor para supervisor debe ser un número entero",
    })
    .optional(),
    id_estado: z
    .number({
        invalid_type_error: "el valor para estado debe ser un número entero",
    })
    .optional(),
    fecha_inicio: z
    .date({
        invalid_type_error: "Ingrese una fecha en fecha_inicio",
    })
    .optional(),
    fecha_fin: z
    .date({
        invalid_type_error: "Ingrese una fecha en fecha_fin",
    })
    .optional(),
});

export const updateProjectSchema = z.object({
    id_area: z
    .number({
        required_error: "El id del área es requerido",
        invalid_type_error: "El valor debe ser un número entero",
    }),
    product_owner: z
    .number({
        invalid_type_error: "el valor para product_owner debe ser un número entero",
    })
    .optional(),
    supervisor_it: z
    .number({
        invalid_type_error: "el valor para supervisor debe ser un número entero",
    })
    .optional(),
    id_estado: z
    .number({
        invalid_type_error: "el valor para estado debe ser un número entero",
    })
    .optional(),
    fecha_inicio: z
    .date({
        invalid_type_error: "Ingrese una fecha en fecha_inicio",
    })
    .optional(),
    fecha_fin: z
    .date({
        invalid_type_error: "Ingrese una fecha en fecha_fin",
    })
    .optional(),
});


