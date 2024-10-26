import Router from "express-promise-router";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getMyProjects,
  updateProject,
  updateProjectDatef,
  getTareasProyecto
} from "../controllers/project.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router()

//router.get("/projects", isAuth, getAllProjects);
router.get("/projects",  getAllProjects);

router.get("/projects/:id", getProject);

router.get("/project/:userId", isAuth, getMyProjects);

//router.post("/projects", validateSchema(createProjectSchema), createProject);
router.post("/projects", createProject);

router.put("/projects/:id", updateProject);

router.put("/project/:id_proyecto", updateProjectDatef);

router.delete("/projects/:id",deleteProject);


router.get("/tareas/tareas_proyecto/:id_proyecto", getTareasProyecto);

export default router;
