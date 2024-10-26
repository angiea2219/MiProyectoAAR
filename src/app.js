import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import areasRoutes from "./routes/areas.routes.js";
import puestosRoutes from "./routes/puestos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

import { ORIGIN } from "./config.js";
import { pool } from "./db.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => res.json({ message: "Bienvenido API" }));
app.get("/api/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});
app.use("/api", taskRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", tareasRoutes);
app.use("/api", areasRoutes);
app.use("/api", puestosRoutes);
app.use("/api", usuariosRoutes);

// Error Hander
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
