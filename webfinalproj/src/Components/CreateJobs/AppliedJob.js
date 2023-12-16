import React, { useState, useEffect } from "react";
import temImg from "./paint.jpeg";
import "./AppliedJob.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AppliedJob = ({ jobTitle, applicants }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getApplicantName = (applicant) => {
    // Find the user with matching userId or userEmail
    const user = allUsers.find((user) => user.email === applicant.userId);

    // Return the user's name or a default value
    return user ? user.fullName : "Unknown User";
  };
  const notify = (message,suc) => {
    if(suc)
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    else
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const updateApplication = async (userId, jobId, status) => {
    try {
      const response = await axios.put(`${BASE_URL}/application/editapp`, {
        userId,
        jobId,
        status,
      });

      if (response.data) {
        notify("Application status updated successfully!",true);
      //  alert('Application status updated successfully!');
      }
    } catch (error) {
      notify('Error updating application status:' +error,false);
  //    console.error('Error updating application status:', error);
    }
  };

  const handleAcceptClick = async (index) => {
    const selectedApplicant = applicants[index];
    const updatedApplicants = [...applicants]; // Create a copy of applicants array

    // Update the status for the selected applicant in the copy
    updatedApplicants[index].status = 'accepted';
    setSelectedItems([...selectedItems, { index, status: 'accepted' }]);

    // Call updateApplication with the updated user and job info
    await updateApplication(selectedApplicant.userId, selectedApplicant.jobId, 'accepted');
  };

  const handleRejectClick = async (index) => {
    const selectedApplicant = applicants[index];
    const updatedApplicants = [...applicants]; // Create a copy of applicants array

    // Update the status for the selected applicant in the copy
    updatedApplicants[index].status = 'rejected';
    setSelectedItems([...selectedItems, { index, status: 'rejected' }]);

    // Call updateApplication with the updated user and job info
    await updateApplication(selectedApplicant.userId, selectedApplicant.jobId, 'rejected');
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    async function fetchAllUsers() {
      try {
        const response = await fetch(`${BASE_URL}/user/getAll`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "This is data of all users to find applicants");
          setAllUsers(data);
        } else {
          throw new Error("Failed to fetch User");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }

    fetchAllUsers();
  }, []);

  return (
    <div className="random-container">
      {/* Left side: List of users */}
      <div className="random-list">
        <h2>{jobTitle}</h2>
        <ul>
          {applicants.map((applicant, index) => (
            <li
              key={index}
              className={`random-list-item ${
                applicant.status === 'accepted'
                  ? 'accepted'
                  : applicant.status === 'rejected'
                  ? 'rejected'
                  : ''
              }`}
            >
              <div>
                <img 
                  src={temImg}
                  alt={`${applicant.name}'s profile`}
                  className="user1-profile-img"
                />
                {getApplicantName(applicant)}
                <button
                  className="random-accept-button"
                  onClick={() => handleAcceptClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="random-reject-button"
                  onClick={() => handleRejectClick(index)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppliedJob;
