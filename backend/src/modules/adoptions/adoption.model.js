const pool = require('../../config/db.postgres');

const findAll = async () => {
  const result = await pool.query(`
    SELECT adoptions.*, adopters.name as adopter_name, adopters.email as adopter_email
    FROM adoptions
    JOIN adopters ON adoptions.adopter_id = adopters.id
    ORDER BY adopted_at DESC
  `);
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    `SELECT adoptions.*, adopters.name as adopter_name, adopters.email as adopter_email
     FROM adoptions
     JOIN adopters ON adoptions.adopter_id = adopters.id
     WHERE adoptions.id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

const create = async ({ adopter_id, pet_mongo_id, notes }) => {
  const result = await pool.query(
    'INSERT INTO adoptions (adopter_id, pet_mongo_id, notes) VALUES ($1, $2, $3) RETURNING *',
    [adopter_id, pet_mongo_id, notes || '']
  );
  return result.rows[0];
};

const updateStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE adoptions SET status=$1 WHERE id=$2 RETURNING *',
    [status, id]
  );
  return result.rows[0] || null;
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM adoptions WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};

module.exports = { findAll, findById, create, updateStatus, remove };