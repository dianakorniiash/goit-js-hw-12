import { getImageByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.button-box'),
  loaderEl: document.querySelector('.loader-box'),
};

let currentPage = 1;
let currentQuery = '';
const perPage = 15; 


async function onFormSubmit(event) {
  event.preventDefault();

  const userInput = event.target.elements[0].value.trim();
  if (!userInput) {
    alert('Please, write something');
    return;
  }

  currentQuery = userInput;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImageByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoader();
      alert('Sorry, no images found. Please try again!');
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      alert("You've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
    hideLoader();
    hideLoadMoreButton();
    alert(`Error: ${error.message}`);
  } finally {
    hideLoader();
  }
}


async function onLoadMoreBtnClick() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImageByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      alert("You've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    alert(`Error: ${error.message}`);
  } finally {
    hideLoader();
  }
}


refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
