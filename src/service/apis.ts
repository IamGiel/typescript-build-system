import { fetchData, fetchDataWithLogging } from './fetch';

export const fetchDataFromDummyJsonUsers = async () => {
  const url = 'https://dummyjson.com/users';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

export const fetchDataFromApi_B = async () => {
  const url = 'https://example.com/api/endpoint_b';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

export const fetchDataFromApi_C = async () => {
  const url = 'https://example.com/api/endpoint_c';
  const method = 'GET';

  return fetchDataWithLogging(url, method);
};

export const postDataToApi = async (payload: any) => {
  const url = 'https://example.com/api/endpoint';
  const method = 'POST';

  return fetchDataWithLogging(url, method, payload);
};

export const updateDataInApi = async (id: number, payload: any) => {
  const url = `https://example.com/api/endpoint/${id}`;
  const method = 'PUT';

  return fetchDataWithLogging(url, method, payload);
};
