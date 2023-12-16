// Admin.js

import React, { useState, useEffect } from "react";
import Navbar from "../Header/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Admin.css"; // Reusing the same styles
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();


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
    async function fetchAllUsers() {
      try {
        const response = await fetch(`${BASE_URL}/user/getAll`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAllUsers(
            data.map((user) => ({
              userName: user.fullName,
              userImg: user.profileImage,
              userEmail: user.email,
              userRole: user.role,
            }))
          );
        } else {
          throw new Error("Failed to fetch User");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
        // Handle errors
      }
    }

    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (email) => {
    // Confirm deletion with a popup
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      const response = await fetch(`${BASE_URL}/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        notify(result.message,true);
        //console.log(result.message); // User deleted successfully
        // Perform any other necessary actions or update state here
      } else {
        notify(`Error deleting user: ${response.status} - ${response.statusText}`,false);
        console.error(
          `Error deleting user: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      notify("Error deleting user:"+ error.message,false);
      console.error("Error deleting user:", error.message);
    }
  };

  const handleUserProfile = async (email) => {

    navigate(`/profile?userEmail=${email}`);
  };

  return (
    <>
      <Navbar />
      <h1> User List </h1>
      <div className="random-user-list-container">
        <h2></h2>
        <ul className="random-list-group">
          {allUsers.map((user, index) => (
            <li key={index} className="random-list-group-item">
              <div className="user-list-random">
                {/* Section 1: Profile Picture */}
                <div>
                  <img className="random-user-list-image" src={user.userImg} />
                </div>

                {/* Section 2: Name and Role */}
                <div className="random-user-details ">
                  <h3 className="random-user-name">
                    {user.userName &&
                      user.userName.charAt(0).toUpperCase() +
                        user.userName.slice(1)}
                  </h3>
                  <span className="random-user-role">
                    Role -{" "}
                    {user.userRole
                      ? user.userRole.charAt(0).toUpperCase() +
                        user.userRole.slice(1)
                      : "Not Set"}
                  </span>
                  <br></br>
                  <FontAwesomeIcon icon={faEnvelope} className="random-icon " />
                  <span>{user.userEmail}</span>
                </div>

                {/* Section 4: Buttons */}
                <div className="abcd">
                  <button 
                    onClick={() => handleUserProfile(user.userEmail)}
                    className="random-action-button">View</button>
                  <button
                    onClick={() => handleDeleteUser(user.userEmail)}
                    className="random-action-button  random-action-button delete"
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
      
    </>
    
  );
}

export default Admin;
