import { refs } from './js/refs';
import { onFormSubmit } from './js/handlers';
import { hideLoader } from './js/render-functions';

hideLoader();
refs.formEl.addEventListener('submit', onFormSubmit);