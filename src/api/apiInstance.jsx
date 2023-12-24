import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://patronus.theleadmanagerapp.com', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // You can add any custom headers here
  },
});

export default apiInstance;
