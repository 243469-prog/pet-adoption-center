const adoptionModel = require('./adoption.model');
const Pet = require('../pets/pet.model');

const getAllAdoptions = async () => {
  return await adoptionModel.findAll();
};

const getAdoptionById = async (id) => {
  const adoption = await adoptionModel.findById(id);
  if (!adoption) throw new Error('Adoption not found');
  return adoption;
};

const createAdoption = async (data) => {
  const adopter_id = Number(data.adopter_id);
  const pet_mongo_id = data.pet_mongo_id;

  if (!adopter_id || !pet_mongo_id) {
    throw new Error('adopter_id and pet_mongo_id are required');
  }

  const pet = await Pet.findById(pet_mongo_id);
  if (!pet) throw new Error('Pet not found');
  if (pet.status !== 'available') throw new Error('Pet is not available for adoption');

  const adoption = await adoptionModel.create({
    adopter_id,
    pet_mongo_id,
    notes: data.notes || ''
  });

  await Pet.findByIdAndUpdate(pet_mongo_id, { status: 'pending' });
  return adoption;
};

const updateAdoptionStatus = async (id, status) => {
  if (!id || !status) throw new Error('ID and status are required');

  const adoption = await adoptionModel.findById(id);
  if (!adoption) throw new Error('Adoption not found');

  const updated = await adoptionModel.updateStatus(id, status);

  if (status === 'approved' || status === 'completed') {
    await Pet.findByIdAndUpdate(adoption.pet_mongo_id, { status: 'adopted' });
  } else if (status === 'rejected') {
    await Pet.findByIdAndUpdate(adoption.pet_mongo_id, { status: 'available' });
  }

  return updated;
};

const deleteAdoption = async (id) => {
  const adoption = await adoptionModel.findById(id);
  if (!adoption) throw new Error('Adoption not found');
  await Pet.findByIdAndUpdate(adoption.pet_mongo_id, { status: 'available' });
  return await adoptionModel.remove(id);
};

module.exports = { getAllAdoptions, getAdoptionById, createAdoption, updateAdoptionStatus, deleteAdoption };