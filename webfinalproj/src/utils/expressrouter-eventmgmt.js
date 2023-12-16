const Event = require('../models/eventModel');
const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

// Endpoint to create a new event
eventRouter.post('/create', eventController.createEvent);

// Endpoint to retrieve all events
eventRouter.get('/getallevents', eventController.getAllEvents);

// Endpoint to get details of a single event by ID
eventRouter.get('/get/:eventId', eventController.getEventById);

// Endpoint to update an event by ID
eventRouter.put('/update/:eventId', eventController.updateEvent);

// Endpoint to delete an event by ID
eventRouter.delete('/delete/:eventId', eventController.deleteEvent);

// Endpoint to register a user for an event
eventRouter.post('/register/:eventId', eventController.registerUserForEvent);

module.exports = eventRouter;
