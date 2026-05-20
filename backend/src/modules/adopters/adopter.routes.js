const express = require('express');
const router = express.Router();
const {
  getAllAdopters,
  getAdopterById,
  createAdopter,
  updateAdopter,
  deleteAdopter
} = require('./adopter.controller');

router.get('/', getAllAdopters);
router.get('/:id', getAdopterById);
router.post('/', createAdopter);
router.put('/:id', updateAdopter);
router.delete('/:id', deleteAdopter);

module.exports = router;