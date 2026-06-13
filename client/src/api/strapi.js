import axios from 'axios';

export const STRAPI_URL = 'http://localhost:1337';

const strapiAPI = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default strapiAPI;