import Router from "express-promise-router";
import {
  createTarea,
  deleteTarea,
  getAllTareas,
  getTarea,
  updateTarea,
  getTareasProyecto,
  getSegTarea,
//SEGUIMIENTOS
  getSeguimientosTarea,
  getSeguimientoTarea,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento
} from "../controllers/tareas.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskS2chema, updateTask2Schema } from "../schemas/tasks2.schema.js";

const router = Router()

router.get("/tareas", getAllTareas);

router.get("/tareas/:id_tarea",  getTarea);

//router.get("/tasks2/mytasks/:id_user", getAllMyTasks2);

router.post("/tareas", createTarea);

router.put("/tareas/:id_tarea",  updateTarea);

router.delete("/tareas/:id_tarea",deleteTarea);

router.get("/tareas/tareas_proyecto/:id_proyecto", getTareasProyecto);


/* RUTAS PARA SEGUIMIENTOS DE TAREAS*/

router.get("/tareas/seguimientos/:id_tarea", getSeguimientosTarea);
router.get("/tareas/seguimiento/:id_seguimiento", getSeguimientoTarea);
router.post("/tareas/seguimientos", createSeguimiento);
router.put("/tareas/seguimientos/:id_seg_tarea",  updateSeguimiento);
router.delete("/tareas/seguimientos/:id_seg_tarea",deleteSeguimiento);

export default router;
