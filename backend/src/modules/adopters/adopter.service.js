const adopterModel = require('./adopter.model');

const getAllAdopters = async () => {
  return await adopterModel.findAll();
};

const getAdopterById = async (id) => {
  const adopter = await adopterModel.findById(id);
  if (!adopter) throw new Error('Adopter not found');
  return adopter;
};

const createAdopter = async (data) => {
  if (!data.name || !data.email) throw new Error('Name and email are required');
  // This now handles duplicate email inside the model
  return await adopterModel.create(data);
};

const updateAdopter = async (id, data) => {
  const adopter = await adopterModel.update(id, data);
  if (!adopter) throw new Error('Adopter not found');
  return adopter;
};

const deleteAdopter = async (id) => {
  const adopter = await adopterModel.remove(id);
  if (!adopter) throw new Error('Adopter not found');
  return adopter;
};

module.exports = { getAllAdopters, getAdopterById, createAdopter, updateAdopter, deleteAdopter };