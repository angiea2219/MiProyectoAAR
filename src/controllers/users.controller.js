import { pool } from "../db.js";

export const getAllUsers = async (req, res, next) => {
  const result = await pool.query("SELECT u.id, u.name, u.email, p.nombre as id_puesto, e.descripcion as id_estado FROM users u inner join estado e on e.id_estado = u.id_estado inner join puesto p on p.id_puesto = u.id_puesto order by u.id ");
  console.log(result.rows)
  return res.json(result.rows); 
};

export const getUser = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un usuario con ese id",
    });
  }

  return res.json(result.rows[0]);
};


export const updateUsuario = async (req, res) => {
  const id = req.params.id;
  const { name, id_puesto, id_estado } = req.body;

  const result = await pool.query(
    "UPDATE users SET name = $1, id_puesto = $2, id_estado = $3 WHERE id = $4 RETURNING *",
    [ name, id_puesto, id_estado, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un usuario con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const deleteUsuario = async (req, res) => {
  const result = await pool.query("DELETE FROM usuario WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un usuario con ese id",
    });
  }

  return res.sendStatus(204);
};
