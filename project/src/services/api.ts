import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://api.openweathermap.org/data/2.5/';
const REQUEST_TIMEOUT = 5000;
const API_KEY = '5a0c68d6e26bd946923b307d312b7d4a';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export { createAPI, API_KEY };
