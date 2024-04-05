const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    streetAddr: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    parkingAvailable: {
        type: Boolean,
        required: true,
    },
    publicTransport: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    }
}, { timestamps: true });

//For text search
propertySchema.index({ name: 'text', description: 'text', streetAddr: 'text', city: 'text', state: 'text', zip: 'text', country: 'text', publicTransport: 'text' });

module.exports = mongoose.model('Property', propertySchema);
