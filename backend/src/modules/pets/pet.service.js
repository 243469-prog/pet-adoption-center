const Pet = require('./pet.model');

const getAllPets = async (filters = {}) => {
  const query = {};
  if (filters.species) query.species = filters.species;
  if (filters.status) query.status = filters.status;
  return await Pet.find(query).sort({ createdAt: -1 });
};

const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  if (!pet) throw new Error('Pet not found');
  return pet;
};

const createPet = async (data) => {
  const pet = new Pet(data);
  return await pet.save();
};

const updatePet = async (id, data) => {
  const pet = await Pet.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!pet) throw new Error('Pet not found');
  return pet;
};

const deletePet = async (id) => {
  const pet = await Pet.findByIdAndDelete(id);
  if (!pet) throw new Error('Pet not found');
  return pet;
};

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet };