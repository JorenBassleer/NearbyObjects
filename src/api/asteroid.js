import axios from 'axios';

export const fetchAsteroids = async ([startDate, endDate]) => {
  try {
    // eslint-disable-next-line no-console
    console.log('API CALL');
    const response = await fetch(`${import.meta.env.VITE_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${import.meta.env.VITE_API_KEY}`);
    if (!response) return [];
    const parsed = await response.json();
    return parsed.data.near_earth_objects;
  } catch (e) {
    return null;
  }
};
