import React, { useEffect, useState } from 'react';
import {fetchEmailListFromApi} from './helpers/apiService';
import EmailListItem from './components/email-list-item/email-list-item-component';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
    <div>
     <h1>Emails</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {data.map((email) => (
            <EmailListItem
              key={email.id} // Assuming each email object has a unique 'id' property
              sender={email?.from?.name}
              fromEmail={email?.from?.name}
              subject={email.subject}
              snippet={email.short_description}
              timestamp={email.date}
              isAddedToFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
