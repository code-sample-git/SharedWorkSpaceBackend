const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['meeting room', 'private office', 'desk'],
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  allowsSmoking: {
    type: String,
    required: true,
  },
  availabilityDate: {
    type: Date,
    required: true,
  },
  leaseTerm: {
    type: String,
    enum: ['day', 'week', 'month'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  size: {
    type: String,
    required: true,
  },
  ratings: [{
    coworker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
  }],
  reviews: [{
    coworker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    review: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
