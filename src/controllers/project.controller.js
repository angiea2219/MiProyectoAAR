import { pool } from "../db.js";

export const getAllProjects = async (req, res, next) => {
    const result = await pool.query("SELECT p.descripcion, p.id_proyecto, a.descripcion_area as area,(select name from users where id = p.product_owner) as po, (select name from users where id = p.supervisor_it) as sup, e.descripcion as estado, p.fecha_inicio, p.fecha_fin FROM proyecto p inner join area a on p.id_area = a.id_area inner join estado e on p.id_estado = e.id_estado ");
    return res.json(result.rows);
  };

export const getMyProjects = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM proyecto WHERE product_owner = $1 or supervisor_it = $1", [
    req.params.userId,
  ]);
  return res.json(result.rows);
};

export const getProject = async (req, res) => {
  const result = await pool.query("SELECT * FROM proyecto WHERE id_proyecto = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un projecto con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const getTareasProyecto = async (req, res) => {
  const result = await pool.query("SELECT * FROM tarea WHERE id_proyecto = $1", [
    req.params.id_proyecto ]);
  console.log(result.rows)

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existen tareas para este proyecto",
    });
  }

  return res.json(result.rows[0]);
};


export const createProject = async (req, res, next) => {
  const { id_area, product_owner ,id_estado ,supervisor_it, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO proyecto (id_area, product_owner, id_estado, supervisor_it, descripcion, fecha_inicio) VALUES ($1, $2, $3, $4, $5, now()) RETURNING *",
      [id_area, product_owner ,id_estado ,supervisor_it,descripcion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un proyecto con ese id",
      });
    }
    next(error);
  }
};

export const updateProject = async (req, res) => {
  const id = req.params.id;
  const { id_area, product_owner ,id_estado ,supervisor_it,descripcion, fecha_inicio, fecha_fin } = req.body;

  const result = await pool.query(
    "UPDATE proyecto SET id_area = $1, product_owner = $2, id_estado = $3, supervisor_it = $4, descripcion = $5, fecha_inicio = $6, fecha_fin = $7 WHERE id_proyecto = $8 RETURNING *",
    [id_area, product_owner ,id_estado ,supervisor_it,descripcion,fecha_inicio, fecha_fin, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un proyecto con este id",
    });
  }

  return res.json(result.rows[0]);
};


export const updateProjectDatef = async (req, res) => {
    const id = req.params.id_proyecto;  
    const result = await pool.query(
      "UPDATE proyecto SET fecha_fin = now() WHERE id_proyecto = $1 RETURNING *",
      [id]
    );
  
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No existe un proyecto con este id",
      });
    }
  
    return res.json(result.rows[0]);
  };

export const deleteProject = async (req, res) => {
  const result = await pool.query("DELETE FROM proyecto WHERE id_proyecto = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un proyecto ese id",
    });
  }

  return res.sendStatus(204);
};
