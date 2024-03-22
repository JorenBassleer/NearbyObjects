import axios from 'axios';
import testData from './testdata.json';

export const fetchLast7Days = async () => {
  try {
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}?start_date=2015-09-07&end_date=2015-09-08&api_key=${import.meta.env.VITE_API_KEY}`);
    // if (!response) return null;
    // response.element_count
    // response.links (prev & next & self)
    return testData.near_earth_objects;
  } catch (e) {
    return null;
  }
};
