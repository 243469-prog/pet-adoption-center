const petService = require('./pet.service');

const getAllPets = async (req, res) => {
  try {
    const pets = await petService.getAllPets(req.query);
    res.json({ success: true, count: pets.length, data: pets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await petService.getPetById(req.params.id);
    res.json({ success: true, data: pet });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const createPet = async (req, res) => {
  try {
    const pet = await petService.createPet(req.body);
    res.status(201).json({ success: true, data: pet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await petService.updatePet(req.params.id, req.body);
    res.json({ success: true, data: pet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const deletePet = async (req, res) => {
  try {
    await petService.deletePet(req.params.id);
    res.json({ success: true, message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet };