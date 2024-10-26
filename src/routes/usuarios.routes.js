import Router from "express-promise-router";
import {
    deleteUsuario,
  getAllUsers,
  getUser,
  updateUsuario,
} from "../controllers/users.controller.js";
const router = Router();

router.get("/usuarios", getAllUsers);
router.get("/usuarios/:id", getUser);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
