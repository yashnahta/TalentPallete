// JobCard.js
// import React from 'react';


// const JobCard = ({ job, onClick, isActive }) => {
//   const cardClass = `job-card ${job.status === 'accepted' ? 'job-accepted' : 'job-not-accepted'}`;
//   const cardClassName = `job-card ${isActive ? 'active' : ''}`;
//   return (
//     <div className={cardClassName} onClick={onClick}>
//     <img src={job.image} alt={job.title} />
//       <h3>{job.title}</h3>
//       <p>{job.description}</p>
//       {/* Add more job details you'd like to show on the card */}
//     </div>
//   );
// };

// export default JobCard;




import React from 'react';

const JobCard = ({ job, onClick, isApplication, isActive }) => {
  // Combine card classes based on active status and application status
  let cardClass = 'job-card';
  if (isActive) {
    cardClass += ' active';
  }
  if (isApplication) {
    switch (job.status) {
        case 'accepted':
            cardClass += ' job-accepted';
            break;
        case 'rejected':
            cardClass += ' job-rejected';
            break;
        default:
            cardClass += ' job-not-reviewed';
    }
}

return (
  <div className={cardClass} onClick={onClick}>
    <img src={job.image} alt={job.title} />
    <h3>{job.title}</h3>
    {/* Uncomment this if you want to display the job description */}
    {/* <p>{job.description}</p> */}
    {/* Additional job details */}

    {/* Display the status if it's in 'My Applications' */}
    {isApplication && (
      <div className="job-status">
        Status: 
        {job.status === 'accepted' && <span className="job-accepted">Accepted</span>}
        {job.status === 'rejected' && <span className="job-rejected">Rejected</span>}
        {job.status !== 'accepted' && job.status !== 'rejected' && <span className="job-not-reviewed">Not Reviewed</span>}
      </div>
    )}
  </div>
);
    }

export default JobCard;