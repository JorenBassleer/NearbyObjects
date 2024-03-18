import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.API_URL,
});

instance.interceptors.response.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.config.url.parameters = import.meta.env.API_KEY;
  },
  (response) => response,
  (error) => {
    if (!error.response || !error.response.data) return Promise.reject(new Error(error.message));

    return Promise.reject(new Error(error.response.data.message));
  },
);

export default instance;
