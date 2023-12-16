import React from "react";
import "./PersonCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserRegular,
  faTimes,
  faEye,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const PersonCard = ({ userName, userImg, userEmail, userRole }) => {
  return (
    <div className="person-card">
      <img src={userImg} alt={userName} />
      <div className="person-details">
        <h4 className="person-name">
          <FontAwesomeIcon icon={faUser} className="icon" />
          {userName}
        </h4>
        <p className="person-email">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          {userEmail}
        </p>
        <p className="person-role">
          <FontAwesomeIcon icon={faUserShield} className="icon" />
          {userRole}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
