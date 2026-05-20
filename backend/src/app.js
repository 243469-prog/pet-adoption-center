const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/db.mongo');
const pool = require('./config/db.postgres');
const { connectPostgres } = require('./config/db.postgres');

const petRoutes = require('./modules/pets/pet.routes');
const adopterRoutes = require('./modules/adopters/adopter.routes');
const adoptionRoutes = require('./modules/adoptions/adoption.routes');
const authRoutes = require('./modules/auth/auth.routes');
const app = express();

app.use(cors());
app.use(express.json());

connectMongo();
connectPostgres();

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adopters', adopterRoutes);
app.use('/api/adoptions', adoptionRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🐾 Pet Adoption API is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


// add this line with the other app.use() lines:


module.exports = app;