const express = require('express');
const router = express.Router();
const {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
  updateAdoptionStatus,
  deleteAdoption
} = require('./adoption.controller');

router.get('/', getAllAdoptions);
router.get('/:id', getAdoptionById);
router.post('/', createAdoption);
router.patch('/:id/status', updateAdoptionStatus);
router.delete('/:id', deleteAdoption);

module.exports = router;