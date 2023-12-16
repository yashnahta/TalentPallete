const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    status: {
        type: String,
        },
    timestamp: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
