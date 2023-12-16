
const User =require('../models/userModel');
const Job =require('../models/jobModel');
const Application=require('../models/applicationModel')
async function apply(email, jobId) {
    const user = await User.findOne({email});
    const userId=email;
    let job ;
  
    try{
     job = await Job.findById(jobId);
    }
    catch(e){
        throw new Error('Job not found');
    }
    if (!user ) {
        throw new Error('User not found');
    }
    const existingApplication = await Application.findOne({ jobId, userId });

   if(existingApplication)
   throw new Error('Already Applied!');

    const application = new Application({
        userId: email,
        jobId: jobId,
        status: "We are reviewing your application",
    });

    await application.save();

    return application;
}

async function getallapplied(userId) {
    let apps;
    console.log(userId);
    if(userId!==undefined){
        apps=await Application.find({ userId });
    }
    else{
     apps = await Application.find({}, "userId jobId status timestamp");
    }
    return apps;
 }
 async function editapp(userId,jobId,status) {

    const appl = await Application.findOne({ userId,jobId });
    if(appl){
      if(status)
      appl.status=status;
      await appl.save();
    }else{
    throw new Error('Application not found');
    }
    return appl;
 }
 




module.exports = { apply,getallapplied,editapp };


