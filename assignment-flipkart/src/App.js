import React, { useEffect, useState } from 'react';
import {fetchEmailListFromApi} from './helpers/apiService';
import './App.css';
import EmailListItem from './components/email-list-item/email-list-item-component';
import EmailDetails from './components/email-detail-component/email-detail-component';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currEmail, setEmail] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchEmailListFromApi();
        console.log("checking data", fetchedData)
        setData(fetchedData?.list);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);
  return (
    <div className='no-overflow'>
     <h1>Emails</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={currEmail == null ? 'email-container full-width' : 'email-container clipped'}>
          <div className={currEmail == null ? 'col-10' : 'col-2'}>
              {data.map((email) => (
                <EmailListItem
                  key={email.id} // Assuming each email object has a unique 'id' property
                  sender={email?.from?.name}
                  fromEmail={email?.from?.name}
                  subject={email.subject}
                  snippet={email.short_description}
                  timestamp={email.date}
                  isAddedToFavorite={true}
                  onClickItem={() => setEmail(email)}
                />
              ))}
          </div>
          <div className={currEmail == null ? '' : 'col-8'}>
              <EmailDetails
                senderInitial="F"
                emailDesc={currEmail}
              />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
