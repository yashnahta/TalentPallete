const mongoose = require('mongoose');
const postService = require('../services/postService');

async function create(req, res) {
  try {
    const { email, postName , postimgUrl,postType, timestamp } = req.body;
    const post = await postService.createPost(email, postName,postimgUrl,postType, timestamp);

    res.status(200).json({ message: 'Post creation successful', post });
  } catch (error) {
    res.status(401).json({ message: 'Post Creation failed', error: error.message });
  }
}

async function getallposts(req, res) {
    try {

      const email = req.query.email;
      const post = await postService.getallposts(email);

  
      res.status(200).json({ message: 'All Posts', post });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }
  

module.exports = { create,getallposts };