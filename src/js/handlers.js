import { getImageByQuery } from './pixabay-api';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
} from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../public/error-icon.svg';

export function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();
  showLoader();
  const userInput = event.target.elements[0].value.trim();

  if (!userInput) {
    iziToast.error({
      message: 'Please write something',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#ffffff',
      iconColor: '#ffffff',
      iconUrl: iconError,
    });
    hideLoader();
    return;
  }

  getImageByQuery(userInput)
    .then(hits => {
      if (!hits || hits.length === 0) {
        throw new Error('No images found');
      }
      showLoader();
      createGallery(hits);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message: `Oops, something is wrong.`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        iconUrl: iconError,
        iconColor: '#ffffff',
      });
    });
}