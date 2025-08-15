import { refs } from './js/refs';
import { onFormSubmit, onLoadMoreBtnClick } from './js/handlers';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);