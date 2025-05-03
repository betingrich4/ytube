import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Auth API
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Video API
export const getVideos = async () => {
  try {
    const response = await api.get('/videos');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getVideo = async (id) => {
  try {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadVideo = async (videoData) => {
  try {
    const response = await api.post('/videos', videoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const likeVideo = async (id) => {
  try {
    const response = await api.post(`/videos/${id}/like`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Search API
export const searchYouTube = async (query) => {
  try {
    const response = await api.get(`/search/youtube?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchLocal = async (query) => {
  try {
    const response = await api.get(`/search/local?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
