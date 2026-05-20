const pool = require('../../config/db.postgres');

const findAll = async () => {
  const result = await pool.query('SELECT * FROM adopters ORDER BY created_at DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM adopters WHERE id = $1', [id]);
  return result.rows[0];
};
const create = async ({ name, email, phone, address }) => {
  // Return existing adopter if email already registered
  const existing = await pool.query(
    'SELECT * FROM adopters WHERE email = $1', [email]
  );
  if (existing.rows[0]) return existing.rows[0];

  // Otherwise create new
  const result = await pool.query(
    'INSERT INTO adopters (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, phone, address]
  );
  return result.rows[0];
};

const update = async (id, { name, phone, address }) => {
  const result = await pool.query(
    'UPDATE adopters SET name=$1, phone=$2, address=$3 WHERE id=$4 RETURNING *',
    [name, phone, address, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM adopters WHERE id=$1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { findAll, findById, create, update, remove };