import axios from 'axios';

// Function to hand;e API calls
export const fetchdata = async (url: string, method: string, data?: any) => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDataWithLogging = async (
  url: string,
  method: string,
  data?: any
) => {
  try {
    const response = await fetchdata(url, method, data);
    console.log('API response:', response);
    // Perform further actions with the retrieved data
    return response;
  } catch (error) {
    console.error('API error:', error);
    // Handle the error condition
    throw error;
  }
};

export const simulateAPICall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000); // Simulating a 2-second delay
  });
};
