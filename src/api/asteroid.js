import axios from 'axios';

export const fetchLast7Days = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}?start_date=2015-09-07&end_date=2015-09-08&api_key=${import.meta.env.VITE_API_KEY}`);
    // eslint-disable-next-line no-console
    console.log('resposne:', response.data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
