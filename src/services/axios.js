import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env,
});

instance.interceptors.response.use(
  (config) => {
    const apiKeyString = `api_key=${import.meta.env.API_KEY}`;
    // eslint-disable-next-line no-param-reassign
    config.config.url += config.config.url.includes('?') ? `&${apiKeyString}` : `?${apiKeyString}`;
  },
  (response) => response,
  (error) => {
    if (!error.response || !error.response.data) return Promise.reject(new Error(error.message));

    return Promise.reject(new Error(error.response.data.message));
  },
);

export default instance;
