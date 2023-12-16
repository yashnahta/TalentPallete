const Post = require('../models/postModel');
const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.post('/create', postController.create);
 postRouter.get('/getallposts', postController.getallposts);

module.exports = postRouter;