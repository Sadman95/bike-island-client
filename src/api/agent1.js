import axios from 'axios';
import { baseUrlV2 } from 'config/env';
import { generateQueryString } from 'utils/generate-query-string';

// base api url
axios.defaults.baseURL = `${baseUrlV2}/api/v2`;

// axios client
const client = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api requests
const requests = {
  get: async (url) => await client.get(url),
  getProgress: async (url, request) => await client.get(url, request),
  post: async (url, body) => await client.post(url, body),
  postProgress: async (url, body, getConfig) => await client.post(url, body, getConfig),
  put: async (url, body) => await client.put(url, body),
  del: async (url) => await client.delete(url),
  postForm: async (url, values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    const response = await client.post(url, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    return response;
  },
};

// authentication requests
const Authentication = {
  SignUp: (info) => requests.post('/auth/signup', info),
  GoogleLogin: (info) => requests.post('/auth/google', info),
  Login: async (info) => await client.post('/auth/login', info),
  GetResetPasswordLink: (info) => requests.post('/auth/forgot-password', info),
  ForgotPasswordChange: (info) => requests.post('/auth/reset-password', info),
  GetOtpVerification: (info) => requests.post('/auth/get-otp', info),
  // requests.post('/auth/verify-otp', info)
  VerifyOtp: (info) => requests.post('/auth/verify-otp', info),
  GetOwnOtp: (payload) => requests.post('/auth/own-otp', payload),
};

// services requests
const Services = {
  GetServices: () => requests.get('/services'),
};

// cycles requests
const Cycles = {
  GetCycles: (queryParams = {}) => {
    const queryString = generateQueryString(queryParams);
    return requests.get(`/cycles?${queryString ?? ''}`);
  },
  GetCycleById: (id = '') => requests.get(`/cycles/${id ?? ''}`),
};



export default {
  Authentication,
  Services,
  Cycles,
};
