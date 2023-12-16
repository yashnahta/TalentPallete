
// ProfessionPage.js
import React, { useState, useEffect } from 'react';
import JobListings from './JobListings';
import CategoryButtons from './CategoryButtons';
import JobModal from './JobModal';
import jobData from './JobData';
import './Profession.css';
import Navbar from '../Header/Navbar';
import axios from 'axios';
import JobCard from './JobCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfessionPage = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs state
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Artist');//Defaut
  const [selectedJob, setSelectedJob] = useState(null);
  const [allJobs, setAllJobs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [email, setEmail] = useState(''); // State to hold email
  const [jobId, setJobId] = useState(''); // State to hold jobId

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedData = await jobData();
        setAllJobs(fetchedData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    const getemail = async () => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.valid === true) {setEmail(data.email);console.log(email);}
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }
  getemail();
    fetchJobs();
  }, []);

  
  // Rest of your code...
  
  const handleCategorySelect = (category) => {
    console.log('Selected category:', category); // Add this line for debugging
    setSelectedCategory(category);
    setActiveCategory(category);
    setSelectedJob(null);
    setCurrentJobIndex(0);
    setShowModal(false);
    setJobs(allJobs[category] || []);
  };
  
 

  const handleJobSelect = (job, index) => {
    setSelectedJob(job);
    setCurrentJobIndex(index);
    setShowModal(true);
  };

  const handleNextJob = () => {
    const jobsInCategory = allJobs[selectedCategory];
  
    if (jobsInCategory && jobsInCategory.length > 0) {
      let nextIndex = (currentJobIndex + 1) % jobsInCategory.length;
      setSelectedJob(jobsInCategory[nextIndex]);
      setCurrentJobIndex(nextIndex);
  
      // Scroll to the next job's position
      const jobElement = document.getElementById(`job-${nextIndex}`);
      if (jobElement) {
        jobElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  const handleApplyJob = async () => {

    console.log('Apply for job:', selectedJob.id);
      const userId=email;
      const jobId=selectedJob.id;
    try {
      const response = await axios.post(`${BASE_URL}/application/apply`, { userId, jobId }); // Replace with your API endpoint
   //   alert('Application successful:', response.data);
      // Toast.showModal('Application successful:', response.data);

      notify('Application successful',true);
      console.log('Application successful:', response.data);
      // Optionally, handle success (e.g., show a success message)
    } catch (error) {
      notify('Error applying',false);
      console.error('Error applying:', error.response.data.message);
    //  setErrorMessage(error.response.data.message); // Display error message
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className='ProfessionPage'>
        <CategoryButtons onSelectCategory={handleCategorySelect} activeCategory={activeCategory} />
        {selectedCategory && !showModal && (
          <JobListings 
            jobs={allJobs[selectedCategory] || []} 
            onSelectJob={handleJobSelect} 
            isApplication={selectedCategory === 'My Applications'}
          />
        )}
         <ToastContainer />

        {showModal && selectedJob && (
          <JobModal 
          key={selectedJob.id}  // Unique key to force re-render
          job={selectedJob}
          onNext={handleNextJob}
          onApply={handleApplyJob}
          onClose={handleCloseModal}
          isApplication={selectedCategory === 'My Applications'}
        />
        )}
      </div>
    </div>
  );
};

export default ProfessionPage;
