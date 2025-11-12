import React from "react";
import "../styles/Notification.css";
import PropTypes from "prop-types";

export default function Notification({ title, message, profileImage, bellIcon, onClose }) {
  if (!message) return null;

  return (
    <div className="notification-container">
      <button className="notification-close-btn" onClick={onClose}>
        &times;
      </button>

      {title && <h3 className="notification-title">{title}</h3>}

      <div className="notification-body">
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="notification-profile"
          />
        )}
        <div className="notification-text">{message}</div>
        {bellIcon && (
          <img src={bellIcon} alt="Bell" className="notification-bell" />
        )}
      </div>
    </div>
  );
}

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  bellIcon: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
