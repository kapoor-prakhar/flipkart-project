// apiService.js

const fetchEmailListFromApi = async () => {
    try {
      const response = await fetch('https://flipkart-email-mock.now.sh/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error to be caught by the component
    }
  };
  
  const fetchEmailDataFromApi = async (id) => {
    try {
      const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data with id:', error);
      throw error; // Rethrow the error to be caught by the component
    }
  };
  
  export { fetchEmailListFromApi, fetchEmailDataFromApi };
  