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
  const [filters, setFilters] = useState([]);
  const [filterList, setFilterList] = useState({})
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchEmailListFromApi();
        console.log("checking data", fetchedData)
        setData(fetchedData?.list);
        setFilteredData(fetchedData?.list);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    // Check if the 'filterArray' is present in localStorage
    const storedFilters = JSON.parse(localStorage.getItem('filterArray'));
    if(data.length ===0) {
      return
    }

    if (!storedFilters || Object.keys(storedFilters).length === 0 ) {
      console.log("checking data", data?.list)
      // If 'filterArray' is not present or empty, initialize with default values
      const initialFilters = {
        unread: !!data && data.map((email) => email.id),
        read: [],
        favorites: [],
      };
      setFilterList(initialFilters)
      localStorage.setItem('filterArray', JSON.stringify(initialFilters));
    } else {
      setFilterList(storedFilters)
    }
  }, [data]);

  const handleFilterClick = (selectedFilter) => {  
      if (filters.includes(selectedFilter)) {
        setFilters(filters.filter((filter) => filter !== selectedFilter));
      } else {
        setFilters([...filters, selectedFilter]);
      }
    
  };

  useEffect(() => {
    setFilteredData(
      filters.length === 0
        ? data 
        : data.filter((email) =>
            filters.every((filter) => filterList[filter].includes(email.id))
          )
    ) 
  }, [filters, data]);

  return (
    <div>
     <div className="filter-container">
      <div className='filter-title'>
        Filter By: 
      </div>
      <div
            className={`filter ${filters.includes('read') ? 'active' : ''}`}
            onClick={() => handleFilterClick('read')}
          >
            Read
        </div>
        <div
          className={`filter ${filters.includes('unread') ? 'active' : ''}`}
          onClick={() => handleFilterClick('unread')}
        >
          Unread
        </div>
        <div
          className={`filter ${filters.includes('favorites') ? 'active' : ''}`}
          onClick={() => handleFilterClick('favorites')}
        >
          Favorites
        </div>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={currEmail == null ? 'email-container full-width' : 'email-container clipped'}>
          <div className={currEmail == null ? 'col-10' : 'col-2'}>
              {filteredData.map((email) => (
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
