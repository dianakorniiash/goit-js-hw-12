import { getImageByQuery } from './pixabay-api';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../public/error-icon.svg';
import { refs } from './refs';

let page = 1;
let currentUserInput = '';
let totalPages;

export async function onFormSubmit(event) {
  event.preventDefault();

  clearGallery();
  hideLoadMoreButton();
  page = 1;
  currentUserInput = '';

  const userInput = event.target.elements[0].value.trim();

  if (userInput === '') {
    displayError('Please, write something');
    return;
  }

  try {
    currentUserInput = userInput;
    showLoader();
    const data = await getImageByQuery(userInput, page);

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      displayError(
        'Sorry, there are no images matching your search query. Please try again'
      );
      hideLoader();
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);
    createGallery(data.hits);
    hideLoader();

    if (page !== totalPages) {
      showLoadMoreButton();
    } else if (page === totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    displayError(error.message);
  }
}

export async function onLoadMoreBtnClick() {
  page += 1;
  let galleryItemSize =
    refs.galleryEl.firstElementChild.getBoundingClientRect();

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImageByQuery(currentUserInput, page);
    createGallery(data.hits);
    window.scrollBy({
      top: galleryItemSize.height * 2,
      behavior: 'smooth',
    });

    totalPages = Math.ceil(data.totalHits / 15);

    if (page === totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      hideLoadMoreButton();
      hideLoader();
      return;
    }

    hideLoader();
    showLoadMoreButton();
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    displayError(error.message);
  }
}

export function displayError(message) {
  iziToast.error({
    message: `There's been an error: ${message}`,
    position: 'topRight',
    backgroundColor: '#ef4040',
    messageColor: '#ffffff',
    iconUrl: iconError,
    iconColor: '#ffffff',
  });
}