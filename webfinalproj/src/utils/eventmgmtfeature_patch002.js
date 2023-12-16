const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  organizerEmail: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventBannerUrl: {
    type: String,
    // Assuming you might not have an image for every event initially.
    default: ''
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: { 
    type: Date,
    default: Date.now 
  },
  updatedAt: { 
    type: Date,
    default: Date.now 
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
