const Property = require('../models/Property');
const User = require('../models/User');

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

exports.getPropertyOwner = async (req, res) => {
    let response = {
        result : false,
        message : "No owner found"
    };
    try{
        const property = await Property.findOne({ _id: req.params.id });
        if (!property) {
            return res.status(404).send();
        }
        const owenId = property.owner;
        console.log("owenId: " + owenId);
        //Get the owner details
        const owner = await User.findOne({ _id: owenId });
        if(owner){
            response.result = true;
            //send back the owner contact
            const ownerContact = {
                name: owner.name,
                phone: owner.phone,
                email: owner.email
            };
            response.message = ownerContact;
        }else{
            response.message = "No owner found";
        }
        res.send(response);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

// Search properties
exports.searchProperties = async (req, res) => {
    const match = {};
    let properties;
    if (req.query.search) {
        //search all properties that contain the search query
        match['$text'] = { $search: req.query.search };
        properties = await Property.find(match);
    } else if (req.query.owner) {
        //search all properties owned by the owner
        match['owner'] = req.query.owner;
        properties = await Property.find(match);
    } else if (req.query.id) {
        //query by id
        try{
            properties = await Property.findById(req.query.id);
        }catch(error){
            res.status(404).send(error);
        }
    } else {
        //return all properties
        properties = await Property.find();
    }

    try {
        res.send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
};

