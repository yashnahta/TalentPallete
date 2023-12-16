const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');

// Endpoint to create a new user profile
profileRouter.post('/create', profileController.createProfile);

// Endpoint to retrieve all user profiles
profileRouter.get('/getallprofiles', profileController.getAllProfiles);

// Endpoint to update a user profile
profileRouter.put('/update/:profileId', profileController.updateProfile);

// Endpoint to delete a user profile
profileRouter.delete('/delete/:profileId', profileController.deleteProfile);

module.exports = profileRouter;
