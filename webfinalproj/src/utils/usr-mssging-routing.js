const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');

// Endpoint to send a new message
messageRouter.post('/send', messageController.sendMessage);

// Endpoint to retrieve all messages between two users
messageRouter.get('/getconversation/:userId1/:userId2', messageController.getConversation);

// Endpoint to retrieve all messages for a specific user
messageRouter.get('/getallmessages/:userId', messageController.getAllMessagesForUser);

module.exports = messageRouter;
