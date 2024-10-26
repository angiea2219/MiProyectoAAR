
import Router from "express-promise-router";
import {
  createArea,
  deleteArea,
  getAllAreas,
  getArea,
  updateArea,
} from "../controllers/areas.controller.js";
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

router.get("/areas",  getAllAreas);
router.get("/areas/:id_area", getArea);
router.post("/areas",  createArea);
router.put("/areas/:id_area", updateArea);
router.delete("/areas/:id_area", deleteArea);

export default router;
