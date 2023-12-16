// Card.js
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Card = ({
  userName, // Assuming this is the email
  userImg,
  postContent,
  postUrl,
  mediaType,
  timestamp,
  email,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    // Navigate to the user's profile page
    navigate(`/profile?userEmail=${email}`);
  };

  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const timeDifference = now - postTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "just now";
    }
  };

  async function fetchProfile(email) {
    try {
      const response = await fetch(
        `${BASE_URL}/user/profile/${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle errors
    }
  }

  useEffect(() => {
    fetchProfile(userName); // Assuming userName is the email
  }, [userName]);

  const formattedTimestamp = calculateTimeDifference(timestamp);

  return (
    <div className="card p-3">
      <div
        className="card-header d-flex align-items-center mb-3 "
        style={{ borderRadius: "2%" }}
      >
        <img
          onClick={handleViewProfile}
          className="profile-picture rounded-circle"

          src={profile?.profileImage?profile.profileImage:userImg}
          alt={`${userName}'s profile`}

        />
        <div className="user-details">
          <h4>{profile?.fullName}</h4>
          <p>{formattedTimestamp}</p>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {showMenu && (
          <div className="menu-list" ref={menuRef}>
            <ul>
              <li onClick={handleViewProfile}>View Profile</li>
              <li>More</li>
            </ul>
          </div>
        )}
      </div>
      <div className="card-content mb-3">
        <p>{postContent}</p>
      </div>
      {mediaType === "image" && postUrl && (
        <div className="card-picture mb-3">
          <img
            src={postUrl}
            alt={`${userName}'s post`}
            className="img-fluid rounded"
          />
        </div>
      )}
      {mediaType === "video" && postUrl && (
        <div className="card-video mb-3">
          <video controls className="img-fluid rounded">
            <source src={postUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="card-actions d-flex">
        <button className="btn btn-primary btn-lg me-3">
          <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        <button className="btn btn-outline-primary btn-lg me-3">
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
        <button className="btn btn-outline-primary btn-lg">
          <FontAwesomeIcon icon={faShare} /> Share
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  userName: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
  postContent: PropTypes.string.isRequired,
  postUrl: PropTypes.string,
  mediaType: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Card;
