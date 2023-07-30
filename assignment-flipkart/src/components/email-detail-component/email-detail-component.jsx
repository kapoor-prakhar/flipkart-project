import React, { useEffect, useState } from 'react';
import "./email-detail-component-style.css"
import { fetchEmailDataFromApi } from '../../helpers/apiService';
import { formatTimestamp } from '../../helpers/utils';

const EmailDetails = ({
    senderInitial,
    emailDesc
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const displayEmail = async () => {
          if(emailDesc != null) {
            try {
              console.log(emailDesc.id);
              const emailBodyData = await fetchEmailDataFromApi(emailDesc.id);
              console.log(emailBodyData);
              setData(emailBodyData?.body);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          }
        };
    
        displayEmail();
      }, [emailDesc]);
    return (
        <div className="card" style={emailDesc == null ? {display: 'none'} : {display: 'flex'}}>
            <div className="card-header">
                <div className="card-header-content">
                    <span className="name-icon">{emailDesc?.from?.name ? emailDesc?.from?.name[0].toUpperCase() : "-"}</span>
                    <div className="subject-line">
                        <h3>{emailDesc?.subject}</h3>
                        <span>{formatTimestamp(emailDesc?.date)}</span>
                    </div>
                    <span className="fav-button">
                        <button>Mark as favourite</button>
                    </span>
                </div>
            </div>
            <div className="card-body">
                <div className="card-body-content">
                    {
                        loading ? (<p>Getting your email...</p>) :
                        error ? (<p>Oops! We ran into some error - {error}</p>)
                        : (<div dangerouslySetInnerHTML={{__html: data}}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default EmailDetails;