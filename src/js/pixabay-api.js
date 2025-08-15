import axios from 'axios';
import { createGallery, hideLoader } from './render-functions';
import iziToast from 'izitoast';
import iconError from '../public/error-icon.svg';

const apiKey = '51785678-62c23287dd78ada80f49c87f0';
axios.defaults.baseURL = `https://pixabay.com`;

export function getImageByQuery(query) {
  const formattedQuery = query.split(' ').join('+');
  return axios
    .get('/api/', {
      params: {
        key: apiKey,
        q: formattedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      return res.data.hits;
    })
    .catch(error => console.log(error));
}