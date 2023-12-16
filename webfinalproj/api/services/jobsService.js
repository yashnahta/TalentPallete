const Jobs = require('../models/jobModel');
const User =require('../models/userModel')
const bcrypt = require('bcrypt');
async function createJobs(email, jobName,jobDesc,jobimgUrl,jobType,timestamp) {
   // const user = await User.findOne({ email });
    if(!jobName){
        throw new Error('JobName is empty');
    }
    if(!jobDesc){
      throw new Error('jobDesc is empty');
  }
    else{
        const job = new Jobs({
            jobName,
            jobDesc,
            email,
            jobimgUrl,
            jobType,
            timestamp
          });
          await job.save();
          return job;
    }
}
async function getallJobs(email) {
  let jobs;
  if(email!==undefined){
     jobs = await Jobs.find({email}, "jobName jobDesc email jobimgUrl jobType adminapproval jobstatus timestamp");
  }
  else{
     jobs = await Jobs.find({}, "jobName jobDesc email jobimgUrl jobType adminapproval jobstatus timestamp");
  }
    return jobs;
 }

 async function deleteJob(_id) {
    const result = await Jobs.deleteOne({ _id });
    return result;
 }

 async function editJob(_id,jobName,jobDesc,jobimgUrl,jobType,adminapproval,jobstatus) {

    const job = await Jobs.findOne({ _id });
    if(job){
      if(jobName)
      job.jobName=jobName;
      if(jobDesc)
      job.jobDesc=jobDesc;
      if(jobimgUrl)
      job.jobimgUrl=jobimgUrl;
      if(jobType)
      job.jobType=jobType;
    if(adminapproval)
    job.adminapproval=adminapproval;
    if(jobstatus)
    job.jobstatus=jobstatus;
      await job.save();
    }
    return job;
 }
 



module.exports = { createJobs ,getallJobs,deleteJob,editJob};


