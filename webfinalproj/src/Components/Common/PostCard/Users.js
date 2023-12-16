// UserList.js

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./UserList.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserList = ({ users, isAdmin = false }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (email) => {
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
        console.log(result.message); // User deleted successfully
        // Perform any other necessary actions or update state here
      } else {
        console.error(
          `Error deleting user: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="user-list-container">
      <h5>Users</h5>
      <ul className="list-group">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">
            <div
              onClick={() => openUserProfile(user)}
              className="d-flex align-items-center"
            >
              <img className="user-list-image" src={user.userImg} />
              <div className="user-details ms-3">
                <p className="">{user.userName}</p>
              </div>
              <div>
                {isAdmin && (
                  <button onClick={() => handleDeleteUser(user.userEmail)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      profilePicture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UserList;
