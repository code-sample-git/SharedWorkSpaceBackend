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

// Search properties
exports.searchProperties = async (req, res) => {
    const match = {};
    if (req.query.search){
        //search all properties that contain the search query
        match['$text'] = { $search: req.query.search };
    }else{
        //return all properties
        match['$text'] = { $search: '' };
    }

    try {
        const properties = await Property.find(match);
        res.send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
};

