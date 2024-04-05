const Property = require('../models/Property');

exports.listProperty = async (req, res) => {
    try {
        const property = new Property({ ...req.body, owner: req.user._id });
        await property.save();
        res.status(201).send(property);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const property = await Property.findOne({ _id: req.params.id, owner: req.user._id });
        if (!property) {
            return res.status(404).send();
        }
        updates.forEach((update) => property[update] = req.body[update]);
        await property.save();
        res.send(property);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delist a property
exports.delistProperty = async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!property) {
            return res.status(404).send();
        }
        res.send(property);
    } catch (error) {
        res.status(500).send(error);
    }
};

