import React from 'react';
import './email-list-item.style.css'; // Import your CSS file for styling
import { formatTimestamp } from '../../helpers/utils';

const EmailListItem = ({ sender, fromEmail, subject, snippet, timestamp, isAddedToFavorite, onClickItem }) => {
  const senderInitial = sender ? sender[0].toUpperCase() : '';

  return (
    <div className="email-card" onClick={onClickItem}>
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
