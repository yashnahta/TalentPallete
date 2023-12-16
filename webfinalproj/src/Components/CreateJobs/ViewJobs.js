// ViewJobs.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadWidget from "../Common/UploadWidget/UploadWidget";
import Navbar from "../Header/Navbar";
import CreateJobForm1 from "./CreateJobForm";
import "./ViewJobs.css";
import Modal from "react-modal";
import AppliedJob from "./AppliedJob";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [renderAppliedJob, setRenderAppliedJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    async function fetchJobsApplied() {
      try {
        const response = await fetch(
          `${BASE_URL}/application/getallapplied`,

          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.appl, "AppliedData");
          setApplied(
            data.appl.map((jobb) => ({
              jobId: jobb.jobId,
              status: jobb.status,
              timestamp: jobb.timestamp,
              userId: jobb.userId,
              _id: jobb._id,
            }))
          );
        } else {
          throw new Error("Failed to fetch User");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }

    async function fetchUserEmail() {
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid === true) {
            setEmail(data.email);
          }
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/jobs/getalljobs?email=${email}`
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobsApplied();
    fetchUserEmail();
    if (email) fetchJobs();
  }, [email]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleEditClick = () => {
    if (selectedJob) {
      setIsModalOpen(true);
    }
  };

  const handleCloseClick = () => {
    setSelectedJob(null);
    setRenderAppliedJob(false);
    setIsModalOpen(false);
  };

  const customModalStyles = {
    content: {
      width: "50%", // Adjust the width as needed
      margin: "auto", // Center the modal horizontally
      borderRadius: "10px",
      boxShadow:
        "0 4px 8px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1) inset",
      backgroundColor: "#fff",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay background color as needed
    },
  };

  console.log("Data", applied);

  return (
    <div className="maincomp">
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div style={{ flex: 1 }}>
          <ul>
            {jobs.map((job) => (
              <li
                key={job._id}
                className="job-list-item"
                onClick={() => handleJobClick(job)}
              >
                <p>{job.jobName}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="right-side" style={{ flex: 2 }}>
          {selectedJob && (
            <div>
              <h2 style={{ textAlign: "center", fontSize: "25px" }}>
                Job Details
              </h2>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Name: {selectedJob.jobName}
              </p>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Job Role: {selectedJob.jobType}
              </p>

              <img
                className="job-post-img"
                src={selectedJob.jobimgUrl}
                alt={`${selectedJob.jobName}'s post`}
              />
              <div className="job-buttons">
                <button onClick={handleEditClick} className="close-button">
                  Applicants
                </button>
                <button onClick={handleCloseClick} className="close-button">
                  Close
                </button>
              </div>
              {isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseClick}
                  contentLabel="Job Details Modal"
                  style={customModalStyles} // Apply the custom styles
                >
                  <div>
                    <h2 style={{ textAlign: "center", fontSize: "25px" }}>
                      Job Details
                    </h2>
                    {selectedJob && (
                      <AppliedJob
                        jobTitle={selectedJob.jobName}
                        applicants={applied.filter(
                          (applicant) => applicant.jobId === selectedJob._id
                        )}
                      />
                    )}
                    <button onClick={handleCloseClick} className="close-button">
                      Close
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewJobs;
