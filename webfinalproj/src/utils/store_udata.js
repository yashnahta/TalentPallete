const mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bio: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
    website: String
  },
  skills: [String],
  createdAt: { 
    type: Date,
    default: Date.now 
  },
  updatedAt: { 
    type: Date,
    default: Date.now 
  }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
