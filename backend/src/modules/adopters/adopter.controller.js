const adopterService = require('./adopter.service');

const getAllAdopters = async (req, res) => {
  try {
    const adopters = await adopterService.getAllAdopters();
    res.json({ success: true, count: adopters.length, data: adopters });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAdopterById = async (req, res) => {
  try {
    const adopter = await adopterService.getAdopterById(req.params.id);
    res.json({ success: true, data: adopter });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const createAdopter = async (req, res) => {
  try {
    const adopter = await adopterService.createAdopter(req.body);
    res.status(201).json({ success: true, data: adopter });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const updateAdopter = async (req, res) => {
  try {
    const adopter = await adopterService.updateAdopter(req.params.id, req.body);
    res.json({ success: true, data: adopter });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const deleteAdopter = async (req, res) => {
  try {
    await adopterService.deleteAdopter(req.params.id);
    res.json({ success: true, message: 'Adopter deleted successfully' });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

module.exports = { getAllAdopters, getAdopterById, createAdopter, updateAdopter, deleteAdopter };