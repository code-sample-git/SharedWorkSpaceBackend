const Workspace = require('../models/Workspace');

exports.listWorkspace = async (req, res) => {
    try {
        const workspace = new Workspace({ ...req.body, property: req.params.propertyId });
        await workspace.save();
        res.status(201).send(workspace);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update a workspace
exports.updateWorkspace = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const workspace = await Workspace.findOne({ _id: req.params.id, property: req.params.propertyId });
        if (!workspace) {
            return res.status(404).send();
        }
        updates.forEach((update) => workspace[update] = req.body[update]);
        await workspace.save();
        res.send(workspace);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delist a workspace
exports.delistWorkspace = async (req, res) => {
    try {
        const workspace = await Workspace.findOneAndDelete({ _id: req.params.id, property: req.params.propertyId });
        if (!workspace) {
            return res.status(404).send();
        }
        res.send(workspace);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Search workspaces
exports.searchWorkspaces = async (req, res) => {
    const match = {};
    let workspaces;
    const property = req.params.propertyId;
    const id = req.params.id;
    console.log(property, id);

    if (property) {
        if(id){
            // Search a specific workspace in the property
            workspaces = await Workspace.findById(id);
        }else{
            // Search all workspaces in the property
            match['property'] = property;
            workspaces = await Workspace.find(match);
        }

    }else{
        workspaces = await Workspace.find();
    }

    try {
        res.send(workspaces);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add a rating
exports.addRating = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.workspaceId);
        if (!workspace) {
            return res.status(404).send();
        }
        workspace.ratings.push({ coworker: req.user._id, rating: req.body.rating });
        await workspace.save();

        // Optionally, calculate the new average rating
        const averageRating = workspace.ratings.reduce((acc, curr) => acc + curr.rating, 0) / workspace.ratings.length;
        res.status(201).send({ workspace, averageRating });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Add a review
exports.addReview = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.workspaceId);
        if (!workspace) {
            return res.status(404).send();
        }
        workspace.reviews.push({ coworker: req.user._id, review: req.body.review });
        await workspace.save();
        res.status(201).send(workspace);
    } catch (error) {
        res.status(400).send(error);
    }
};


