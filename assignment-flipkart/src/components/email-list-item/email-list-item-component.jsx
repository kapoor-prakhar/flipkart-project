import React from 'react';
import './email-list-item.style.css'; // Import your CSS file for styling


const EmailListItem = ({ sender, fromEmail, subject, snippet, timestamp, isAddedToFavorite }) => {
  const senderInitial = sender ? sender[0].toUpperCase() : '';

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${day}/${month}/${year} ${hours % 12}:${minutes} ${ampm}`;
  };

  return (
    <div className="email-card">
      <div className="initial-circle">{senderInitial}</div>
      <div className="email-details">
        <div className="from-email">From: {fromEmail}</div>
        <div className="subject">Subject: {subject}</div>
        <div className="snippet">{snippet}</div>
        <div className="timestamp">
          {formatTimestamp(timestamp)}
          {isAddedToFavorite && <span className="favorite-text">Favorite</span>}
        </div>
      </div>
    </div>
  );
};

export default EmailListItem;
