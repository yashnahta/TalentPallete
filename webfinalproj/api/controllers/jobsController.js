const mongoose = require('mongoose');
const jobsService = require('../services/jobsService');
const Jobs = require('../models/jobModel');

async function create(req, res) {
  try {

    const { email, jobName ,jobDesc, jobimgUrl,jobType,timestamp } = req.body;
    const jobs = await jobsService.createJobs(email, jobName,jobDesc,jobimgUrl,jobType,timestamp);


    res.status(200).json({ message: 'Job creation successful', jobs });
  } catch (error) {
    res.status(401).json({ message: 'Job Creation failed', error: error.message });
  }
}

async function getalljobs(req, res) {
    try {
   //   const { email, postName ,postimgUrl,postType} = req.body;
   const email = req.query.email;
      const jobs = await jobsService.getallJobs(email);
  
      res.status(200).json({ message: 'All Jobs', jobs });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }

  async function deletejob(req, res) {
    try {
      const { _id} = req.body;
      const result = await jobsService.deleteJob(_id);

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // return res.status(200).json({ message: "Job deleted successfully" });
  
      res.status(200).json({ message: 'Deleted Job with ID '+ _id, result });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }

  async function editjob(req, res) {
    
      try {

        const { _id,jobName,jobDesc,jobimgUrl,jobType,adminapproval,jobstatus} = req.body;
        const result = await jobsService.editJob(_id,jobName,jobDesc,jobimgUrl,jobType,adminapproval,jobstatus);    
     
        if (!jobName) {
          return res.status(400).json({ message: "Job name cant be emmpty." });
        }

        if (!jobDesc) {
          return res.status(400).json({ message: "Job description cant be emmpty." });
        }

        if (!jobType) {
          return res.status(400).json({ message: "Job Type cant be emmpty." });
        }
       
   
  
      res.status(200).json({ message: 'Updated Job with ID '+ _id,result });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }




  

module.exports = { create,getalljobs,deletejob,editjob };