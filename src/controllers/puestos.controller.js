import { pool } from "../db.js";

export const getAllPuestos = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM puesto order by id_puesto");
  console.log(result.rows)
  return res.json(result.rows); 
};

export const getPuesto = async (req, res) => {
  console.log(req.params.id_puesto)
  const result = await pool.query("SELECT * FROM puesto WHERE id_puesto = $1", [
    req.params.id_puesto,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un puesto con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createPuesto = async (req, res, next) => {
  const { id_puesto, nombre, descripcion, estado } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO puesto (id_puesto, nombre, descripcion, estado) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_puesto, nombre, descripcion, estado]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un puesto con ese id",
      });
    }
    next(error);
  }
};

export const updatePuesto = async (req, res) => {
  const id_puesto = req.params.id_puesto;
  const { nombre, descripcion, estado } = req.body;

  const result = await pool.query(
    "UPDATE puesto SET nombre = $1, descripcion = $2, estado = $3 WHERE id_puesto = $4 RETURNING *",
    [nombre, descripcion, estado, id_puesto]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un puesto con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const deletePuesto = async (req, res) => {
  const result = await pool.query("DELETE FROM puesto WHERE id_puesto = $1", [
    req.params.id_puesto,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un puesto con ese id",
    });
  }

  return res.sendStatus(204);
};
