import { getImageByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
    iziToast.warning({
      title: "Warning",
      message: "Please, write something",
      position: "topRight",
    });
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
      iziToast.error({
        title: "Error",
        message: "Sorry, no images found. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: "Info",
        message: "You've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    iziToast.error({
      title: "Error",
      message: error.message,
      position: "topRight",
    });
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


    const { height: cardHeight } = refs.galleryEl
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: "Info",
        message: "You've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    iziToast.error({
      title: "Error",
      message: error.message,
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
}


refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
