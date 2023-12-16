//managing admin posts 



const mongoose = require('mongoose');
const postsService = require('../services/postsService');
const Post = require('../models/postModel');

// Create a new post
async function createPost(req, res) {
  try {
    const { authorId, content, imageUrl, createdAt } = req.body;
    const post = await postsService.createPost(authorId, content, imageUrl, createdAt);

    res.status(200).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(400).json({ message: 'Post creation failed', error: error.message });
  }
}

// Retrieve all posts
async function getAllPosts(req, res) {
  try {
    const posts = await postsService.getAllPosts();

    res.status(200).json({ message: 'Fetched all posts', posts });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch posts', error: error.message });
  }
}

// Delete a post by ID
async function deletePost(req, res) {
  try {
    const { postId } = req.params; // Assuming _id is passed as a URL parameter
    const result = await postsService.deletePost(postId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: `Deleted post with ID ${postId}`, result });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete post', error: error.message });
  }
}

// Update a post
async function updatePost(req, res) {
  try {
    const { postId, newContent, newImageUrl } = req.body;
    const result = await postsService.updatePost(postId, newContent, newImageUrl);

    if (!newContent && !newImageUrl) {
      return res.status(400).json({ message: "Post content or image URL must be provided." });
    }

    res.status(200).json({ message: `Updated post with ID ${postId}`, result });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update post', error: error.message });
  }
}

module.exports = { createPost, getAllPosts, deletePost, updatePost };
