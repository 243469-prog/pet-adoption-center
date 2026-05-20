const adoptionService = require('./adoption.service');

const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    res.json({ success: true, count: adoptions.length, data: adoptions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAdoptionById = async (req, res) => {
  try {
    const adoption = await adoptionService.getAdoptionById(req.params.id);
    res.json({ success: true, data: adoption });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const createAdoption = async (req, res) => {
  try {
    // We take the data sent from the frontend (req.body) 
    // and pass it to the service
    const adoptionData = {
      adopter_id: req.body.adopter_id,
      pet_mongo_id: req.body.pet_mongo_id,
      notes: req.body.notes
    };

    const adoption = await adoptionService.createAdoption(adoptionData);
    
    res.json({ success: true, data: adoption });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
const updateAdoptionStatus = async (req, res) => {
  try {
    const adoption = await adoptionService.updateAdoptionStatus(req.params.id, req.body.status);
    res.json({ success: true, data: adoption });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    await adoptionService.deleteAdoption(req.params.id);
    res.json({ success: true, message: 'Adoption request deleted' });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

module.exports = { getAllAdoptions, getAdoptionById, createAdoption, updateAdoptionStatus, deleteAdoption };