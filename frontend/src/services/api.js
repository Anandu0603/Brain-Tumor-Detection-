import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include admin token
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFeedbacks = async () => {
  try {
    const response = await api.get('/admin/feedback'); // Changed route to singular 'feedback'
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
