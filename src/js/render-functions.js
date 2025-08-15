import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLightBox;

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item"><a href="${largeImageURL}" class="gallery-link">
            <img
              src="${webformatURL}"
              alt="${tags}"
              class="gallery-image"
  
            />
          </a>
          <ul class="image-stats-list">
            <li class="image-stats-item">
              <p class="image-stats-title">Likes</p>
              <p class="image-stats">${likes}</p>
            </li>
            <li class="image-stats-item">
              <p class="image-stats-title">Views</p>
              <p class="image-stats">${views}</p>
            </li>
            <li class="image-stats-item">
              <p class="image-stats-title">Comments</p>
              <p class="image-stats">${comments}</p>
            </li>
            <li class="image-stats-item">
              <p class="image-stats-title">Downloads</p>
              <p class="image-stats">${downloads}</p>
            </li>
          </ul>
          </li>`
    )
    .join(' ');

  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

  if (!galleryLightBox) {
    galleryLightBox = new SimpleLightbox('.gallery a', {
      animationSpeed: 300,
      fadeSpeed: 250,
      captions: true,
      captionDelay: 250,
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      showCounter: true,
      scrollZoom: true,
    });
  } else {
    galleryLightBox.refresh();
  }
}

export function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

export function showLoader() {
  refs.loaderEl.classList.remove('visually-hidden');
}

export function hideLoader() {
  if (!refs.loaderEl.classList.contains('visually-hidden')) {
    refs.loaderEl.classList.add('visually-hidden');
  }
}

export function showLoadMoreButton() {
  refs.loadMoreBtnEl.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  if (!refs.loadMoreBtnEl.classList.contains('visually-hidden')) {
    refs.loadMoreBtnEl.classList.add('visually-hidden');
  }
}