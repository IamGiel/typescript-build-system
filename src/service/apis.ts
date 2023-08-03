import { fetchData, fetchDataWithLogging } from './fetch';

export const fetchDataFromDummyJsonUsers = async () => {
  const url = 'https://dummyjson.com/users';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

export const fetchDataFromMapboxApi = async () => {
  const url =
    'https://api.mapbox.com/styles/v1/alphagiel/cljqn6pa8011901qma20y09hg/draft.html?title=view&access_token=pk.eyJ1IjoiYWxwaGFnaWVsIiwiYSI6ImNsanFuM2tjbTA2eTAzZG55bWdjenZ5d3MifQ.h7MZb_1Mi2Mbh4Val3RPhg&zoomwheel=true&fresh=true#2/37.75/-92.25';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

export const fetchDataFromApi_C = async () => {
  const url = 'https://example.com/api/endpoint_c';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

// export const postDataToApi = async (payload: any) => {
//   const url = 'https://example.com/api/endpoint';
//   const method = 'POST';

//   return fetchDataWithLogging(url, method, payload);
// };

export const updateDataInApi = async (id: number, payload: any) => {
  const url = `https://example.com/api/endpoint/${id}`;
  const method = 'PUT';

  return fetchDataWithLogging(url, method, payload);
};

export const fetchMatchoryToken = async (payload) => {
  const url = 'https://discovery.matchory.com/oauth/token';
  const method = 'POST';
  return fetchDataWithLogging(url, method, payload);
};

export const fetchMatchoryMachineToken = async (token) => {
  const url = 'https://discovery.matchory.com/oauth/token';
  const method = 'POST';
  return fetchDataWithLogging(url, method, token);
};

export const fetchMatchoryCreateQueryApi = async (payload) => {
  const url = 'https://localhost/3002/matchory';
  const method = 'POST';
  return fetchDataWithLogging(url, method, payload);
};

// export const fetchMatchory = async (payload) => {
//   console.log('calling fetchMatchor: ', payload)
//   const url = 'https://localhost/3002/matchory';
//   const method = 'POST';
//   return fetchDataWithLogging(url, method, payload)
// }
