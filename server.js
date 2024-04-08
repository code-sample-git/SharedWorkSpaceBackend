require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const propertyController = require('./controllers/propertyController');
const workspaceController = require('./controllers/workspaceController');
const auth = require('./middleware/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Use routes
app.use('/api/users', userRoutes);

const router = express.Router();

// Property routes
router.post('/properties', auth, propertyController.listProperty);
router.patch('/properties/:id', auth, propertyController.updateProperty);
router.delete('/properties/:id', auth, propertyController.delistProperty);
router.get('/properties', propertyController.searchProperties);

// Workspace routes
router.post('/properties/:propertyId/workspaces', auth, workspaceController.listWorkspace);
router.patch('/properties/:propertyId/workspaces/:id', auth, workspaceController.updateWorkspace);
router.delete('/properties/:propertyId/workspaces/:id', auth, workspaceController.delistWorkspace);
router.get('/properties/:propertyId/workspaces', workspaceController.searchWorkspaces);
router.get('/properties/:propertyId/workspaces/:id', workspaceController.searchWorkspaces);

// Search route
router.get('/workspaces/search', workspaceController.searchWorkspaces);

app.use('/api', router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
