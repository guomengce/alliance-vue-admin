import axios from 'axios';
import { mockRequest } from './mock';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const httpClient = baseURL ? axios.create({ baseURL }) : null;

function validateEnvelope(result) {
  if (result?.code !== 0) {
    const error = new Error(result?.message || 'Request failed');
    error.response = result;
    throw error;
  }

  return result;
}

export async function request({ method = 'GET', url, data, params } = {}) {
  if (httpClient) {
    const response = await httpClient.request({ method, url, data, params });
    return validateEnvelope(response.data);
  }

  const result = await mockRequest({ method, url, data, params });
  return validateEnvelope(result);
}
