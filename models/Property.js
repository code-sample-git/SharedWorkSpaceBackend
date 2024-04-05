const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  squareFeet: {
    type: Number,
    required: true,
  },
  hasParkingGarage: {
    type: Boolean,
    required: true,
  },
  isReachableByPublicTransport: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
