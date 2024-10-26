import { pool } from "../db.js";

export const getAllAreas = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM area order by id_area");
  console.log(result.rows)
  return res.json(result.rows);
};

export const getArea = async (req, res) => {
  console.log(req.params.id_area)
  const result = await pool.query("SELECT * FROM area WHERE id_area = $1", [
    req.params.id_area,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un area con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createArea = async (req, res, next) => {
  const { id_area, descripcion_area } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO area (id_area, descripcion_area) VALUES ($1, $2) RETURNING *",
      [id_area, descripcion_area]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe una area con ese id",
      });
    }
    next(error);
  }
};

export const updateArea = async (req, res) => {
  const id_area = req.params.id_area;
  const { descripcion_area } = req.body;

  const result = await pool.query(
    "UPDATE area SET descripcion_area = $1 WHERE id_area = $2 RETURNING *",
    [descripcion_area, id_area]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un area con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const deleteArea = async (req, res) => {
  const result = await pool.query("DELETE FROM area WHERE id_area = $1", [
    req.params.id_area,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un area con ese id",
    });
  }

  return res.sendStatus(204);
};




