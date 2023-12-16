const mongoose = require('mongoose');
const applicationService = require('../services/applicationService');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const Application = require('../models/applicationModel');

async function apply(req, res) {
  try {
    const { userId, jobId } = req.body;
    const appl = await applicationService.apply(userId, jobId);
    console.log(userId,jobId);
    res.status(200).json({ message: 'Applied successfully', appl });
  } catch (error) {
    res.status(401).json({ message: 'Application failed', error: error.message });
  }
}

async function getallapplied(req, res) {
    try {
      const userId = req.query.email;
      const appl = await applicationService.getallapplied(userId);
  
      res.status(200).json({ message: 'All appl', appl });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }

  async function deleteapp(req, res) {
    try {
      const { _id} = req.body;
      const result = await applicationService.deleteapp(_id);

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // return res.status(200).json({ message: "Job deleted successfully" });
  
      res.status(200).json({ message: 'Deleted Job with ID '+ _id, result });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }

  async function editapp(req, res) {
    
      try {
        const { userId,jobId,status} = req.body;
        const result = await applicationService.editapp(userId,jobId,status);
      
    
      
        if (!userId) {
          return res.status(400).json({ message: "User Email cant be emmpty." });
        }
        if (!jobId) {
          return res.status(400).json({ message: "Job ID cant be emmpty." });
        }
        if(!status){
          return res.status(400).json({ message: "Job Status cant be emmpty." });
        }
       
   
  
      res.status(200).json({ message: 'Updated Job with ID '+ jobId,result });
    } catch (error) {
      res.status(401).json({ message: 'An error occurred', error: error.message });
    }
  }




  

module.exports = { apply,getallapplied,deleteapp,editapp };