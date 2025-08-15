import axios from 'axios';
import { displayError } from './handlers';

const apiKey = '51363683-2e56118fc156594c4f1ee220a';
axios.defaults.baseURL = `https://pixabay.com`;

export async function getImageByQuery(query, page) {
  try {
    const response = await axios.get('/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    displayError(error.message);
  }
}