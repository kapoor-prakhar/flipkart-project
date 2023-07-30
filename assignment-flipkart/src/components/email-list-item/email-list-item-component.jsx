import React from 'react';
import './email-list-item.style.css'; // Import your CSS file for styling

const EmailListItem = ({ sender, fromEmail, subject, snippet, timestamp }) => {
    const senderInitial = sender ? sender[0].toUpperCase() : '';
  
    return (
      <div className="email-card">
        <div className="initial-circle">{senderInitial}</div>
        <div className="email-details">
          <div className="from-email">{fromEmail}</div>
          <div className="subject">{subject}</div>
          <div className="snippet">{snippet}</div>
          <div className="timestamp">{timestamp}</div>
        </div>
      </div>
    );
  };
  
  export default EmailListItem;
  