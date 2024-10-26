
import Router from "express-promise-router";
import {
  createPuesto,
  deletePuesto,
  getAllPuestos,
  getPuesto,
  updatePuesto,
} from "../controllers/puestos.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router()
/*
router.get("/tasks", isAuth, getAllTasks);

router.get("/tasks/:id", isAuth, getTask);

router.post("/tasks", isAuth, validateSchema(createTaskSchema), createTask);

router.put("/tasks/:id", isAuth, validateSchema(updateTaskSchema), updateTask);

router.delete("/tasks/:id", isAuth, deleteTask);
*/

router.get("/puestos",  getAllPuestos);
router.get("/puestos/:id_puesto", getPuesto);
router.post("/puestos",  createPuesto);
router.put("/puestos/:id_puesto", updatePuesto);
router.delete("/puestos/:id_puesto", deletePuesto);

export default router;
