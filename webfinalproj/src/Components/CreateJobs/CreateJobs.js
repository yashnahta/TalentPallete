import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import CreateJobForm1 from "./CreateJobForm";
import ViewJobs from "./ViewJobs";
import "./Job.css";

const CreateJobs = () => {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showViewJobs, setShowViewJobs] = useState(false);

  const handleCreateJobClick = () => {
    setShowCreateJob(true);
    setShowViewJobs(false);
  };

  const handleViewJobsClick = () => {
    setShowCreateJob(false);
    setShowViewJobs(true);
  };

  return (
    <div>
      <Navbar />
      <div className="diff">
        <button
          onClick={handleCreateJobClick}
          className={`createjob ${showCreateJob ? "active" : ""}`}
        >
          Create Jobs
        </button>
        <button
          onClick={handleViewJobsClick}
          className={`createjob ${showViewJobs ? "active" : ""}`}
        >
          View Jobs
        </button>
      </div>
      {showCreateJob && <CreateJobForm1 />}
      {showViewJobs && <ViewJobs />}
    </div>
  );
};

export default CreateJobs;
