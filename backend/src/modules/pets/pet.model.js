const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, enum: ['dog', 'cat', 'rabbit', 'bird', 'other'] },
    breed: { type: String, default: 'Unknown' },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ['male', 'female'], required: true },
    description: { type: String, default: '' },
    healthNotes: { type: String, default: '' },
    vaccinated: { type: Boolean, default: false },
    tags: [{ type: String }],
    imageUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['available', 'pending', 'adopted'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);