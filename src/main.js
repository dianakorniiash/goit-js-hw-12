import { getImageByQuery } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

let currentPage = 1;
let currentQuery = '';
const perPage = 40;

const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  loaderEl: document.querySelector('.loader'),
};


async function onFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  currentQuery = searchQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const images = await getImageByQuery(currentQuery, currentPage, perPage);

    if (images.hits.length === 0) {
      hideLoader();
      return alert('Sorry, no images found. Please try again!');
    }

    renderGallery(images.hits);

    if (images.totalHits > perPage) {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}


async function onLoadMoreBtnClick() {
  currentPage += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const images = await getImageByQuery(currentQuery, currentPage, perPage);

    renderGallery(images.hits);

    const totalPages = Math.ceil(images.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreBtn();
    } else {
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}


refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
