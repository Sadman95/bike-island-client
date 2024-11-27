import axios from 'axios';
import { appTitle, baseUrlV2 } from 'config/env';
import { validateJwt } from 'helpers/jwtHelper';
import { decrypt } from 'utils/decrypt';
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

//interceptor for giving token in every request...
client.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(
      JSON.parse(localStorage.getItem('persist:' + appTitle)).auth,
    ).user;
    const token = validateJwt(decrypt(currentUser.token)) ? decrypt(currentUser.token) : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

// api requests
const requests = {
  get: async (url) => await client.get(url),
  getProgress: async (url, config = null) => await client.get(url, config),
  post: async (url, body = {}) => await client.post(url, body),
  postProgress: async (url, body, getConfig) => await client.post(url, body, getConfig),
  put: async (url, body) => await client.put(url, body),
  putProgress: async (url, body, getConfig) => await client.put(url, body, getConfig),
  patch: async (url, body) => await client.patch(url, body),
  patchProgress: async (url, body, getConfig) => await client.patch(url, body, getConfig),
  del: async (url) => await client.delete(url),
  patchForm: async (url, values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    return await client.patchForm(url, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },
  postForm: async (url, values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else formData.append(key, value);
    });

    return await client.postForm(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// user request
const User = {
  UpdateAccount: (id, info) => requests.patchForm(`/users/${id}`, info),
  LogOut: () => requests.post('/auth/logout'),
  ChangePassword: (info) => requests.patchProgress('/auth/change-password', info, {
    withCredentials: true
  }),
  GetProile: () => requests.get('/users/profile'),
  GetUser: (id = '') => requests.get(`/users/${id}`),
  CreateOrder: (payload = null) =>
    requests.post('/orders', payload, {
      withCredentials: true,
    }),
  RegenerateToken: () =>
    requests.postProgress(
      '/auth/refresh',
      {},
      {
        withCredentials: true,
      },
    ),
  GetOrders: (queryParams = {}) => {
    const queryString = generateQueryString(queryParams);
    return requests.getProgress(`/orders/self?${queryString ?? ''}`, {
      withCredentials: true
    });
  },
  GetOrder: (orderId = '') => requests.get(`/orders/${orderId}`),
  UpdateOrder: (orderId, payload) =>
    requests.putProgress(`/orders/${orderId}`, payload, {
      withCredentials: true,
    }),
  CreateReview: (productId, payload) => requests.postForm(`/reviews/${productId}`, payload),
  DeleteReview: (reviewId) => requests.del(`/reviews/${reviewId}`),
  GetOwnReviews: (queryParams = {}) => {
    const queryString = generateQueryString(queryParams);
    return requests.get(`/reviews?${queryString ?? ''}`);
  },
  GetAddress: () =>
    requests.get('/address', {
      withCredentials: true,
    }),
};

const Payment = {
  CreateIntent: (payload) => requests.post('/payment/create-intent', payload),
};

// review requests
const Reviews = {
  GetReviews: (productId = '', queryParams = '') => {
    const queryString = generateQueryString(queryParams);
    return requests.get(`/reviews/${productId}?${queryString ?? ''}`);
  },
  GetPendingReviews: () =>
    requests.get('/reviews/pending', {
      withCredentials: true,
    }),
};

const Admin = {
  GetAllUsers: (queryParams = {}) => {
    const queryString = generateQueryString(queryParams);
    return requests.get(`/users?${queryString ?? ''}`);
  },
  GetAllOrders: (queryParams = {}) => {
    const queryString = generateQueryString(queryParams);
    return requests.get(`/orders?${queryString ?? ''}`);
  },
  GetStats: () => requests.get('/admin/stats'),
  GetTeams: () => requests.get('/admin/teams'),
  DeleteOrder: (id) => requests.del(`/orders/${id}`),
  AddProduct: (payload) => requests.postForm('/cycles', payload),
  UpdateCycle: (id, payload) => requests.patchForm(`/cycles/${id}`, payload),
  DeleteCycle: (id) => requests.del(`/cycles/${id}`),
  DeleteBulkOrder: (payload) =>
    requests.postProgress('/orders/bulk-delete', payload, {
      withCredentials: true,
    }),
  DeleteUser: (id) => requests.del(`/users/${id}`),
  DeleteBulkUser: (payload) =>
    requests.postProgress('/users/bulk-delete', payload, {
      withCredentials: true,
    }),
  DeleteBulkCycles: (payload) =>
    requests.postProgress('/cycles/bulk-delete', payload, {
      withCredentials: true,
    }),
  CreateRole: (payload) => requests.post('/admin/roles', payload),
  UpdateRole: (id, payload) => requests.put(`/admin/roles/${id}`, payload),
  GetRoles: () => requests.get('/admin/roles'),
  DeleteRole: (id) => requests.del(`/admin/roles/${id}`),
};

export default {
  User,
  Payment,
  Admin,
  Reviews,
};
