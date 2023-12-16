const mongoose =  require('mongoose');

var jobSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    jobName: {
    type: String,
    required: true,
    },
    jobDesc: {
      type: String,
      required: true,
      },
    jobimgUrl: {
      type: String,
      },
      jobType: {
        type: String,
        },
        adminapproval:{
          type: String,
          default: "AdminCheck"
        },
        jobstatus:{
          type: String,
          default: "open"
        },
    timestamp: { 
      type: Date, default: Date.now 
    }
});
const Jobs = mongoose.model('Jobs', jobSchema);

module.exports=Jobs;
