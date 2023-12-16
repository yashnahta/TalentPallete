const BASE_URL = process.env.REACT_APP_BASE_URL;

const jobData = async () => {
  const organizedData = {};
  let email="";

 
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.valid === true) {email=data.email;console.log(email);getjobdata();}
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        // Handle errors
      }
    
      async function getjobdata() {
  try {
    const jobsResponse = await fetch(`${BASE_URL}/jobs/getalljobs`);

    const applicationsResponse = await fetch(`${BASE_URL}/application/getallapplied?email=${email}`);
    console.log(email);
    if (!jobsResponse.ok || !applicationsResponse.ok) {
      throw new Error('One or more network responses were not ok.');
    }

    const jobsData = await jobsResponse.json();
    const applicationsData = await applicationsResponse.json();

    jobsData.jobs.forEach(job => {
    //  && job.adminapproval==="AdminCheck"
      if (job.jobstatus === "open" ) {
        if (!organizedData[job.jobType]) {
          organizedData[job.jobType] = [];
        }
        organizedData[job.jobType].push({
          id: job._id,
          title: job.jobName,
          description: job.jobDesc,
          image: job.jobimgUrl
        });
      }
    });
    // console.log(applicationsData.appl[0].);
    applicationsData.appl.forEach(application => {
      const matchedJob = jobsData.jobs.find(job => job._id === application.jobId ); // Assuming the id field matches between jobs and applications

      if (matchedJob) {
        if (!organizedData['My Applications']) {
          organizedData['My Applications'] = [];
        }

        organizedData['My Applications'].push({
          id: matchedJob._id,
          title: matchedJob.jobName,
          description: matchedJob.jobDesc,
          image:matchedJob.jobimgUrl,
          status: application.status
        
        });
       // console.log(matchedJob.jobName+application.status);
      }
    });
    
    if (organizedData['My Applications']) {
      const myApplicationsJobsIds = new Set(organizedData['My Applications'].map(app => app.id));

      for (const category in organizedData) {
        if (category !== 'My Applications') {
          organizedData[category] = organizedData[category].filter(job => !myApplicationsJobsIds.has(job.id));
        }
      }
    }

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

  return organizedData;
};

export default jobData;
