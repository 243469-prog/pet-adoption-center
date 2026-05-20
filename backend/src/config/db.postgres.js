const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

const connectPostgres = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');
    await createTables();
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
  }
};

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS adopters (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS adoptions (
      id SERIAL PRIMARY KEY,
      adopter_id INTEGER REFERENCES adopters(id) ON DELETE CASCADE,
      pet_mongo_id VARCHAR(100) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
      notes TEXT,
      adopted_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✅ PostgreSQL tables ready');
};

module.exports = pool;
module.exports.connectPostgres = connectPostgres;