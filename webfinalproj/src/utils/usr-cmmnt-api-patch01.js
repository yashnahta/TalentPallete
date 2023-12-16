const mongoose = require('mongoose');
const commentService = require('../services/commentService');

// Create a new comment
async function createComment(req, res) {
  try {
    const { userId, postId, text, createdAt } = req.body;
    const comment = await commentService.createComment(userId, postId, text, createdAt);

    res.status(200).json({ message: 'Comment creation successful', comment });
  } catch (error) {
    res.status(400).json({ message: 'Comment creation failed', error: error.message });
  }
}

// Retrieve all comments for a specific post
async function getAllComments(req, res) {
  try {
    const { postId } = req.params; // Assuming postId is passed as a URL parameter
    const comments = await commentService.getAllCommentsForPost(postId);

    res.status(200).json({ message: 'All comments fetched successfully', comments });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch comments', error: error.message });
  }
}

module.exports = { createComment, getAllComments };


//user cmmnt mgr
