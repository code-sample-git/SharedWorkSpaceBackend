const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
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
    type: Boolean,
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
  ratings: [{
    coworker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
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
