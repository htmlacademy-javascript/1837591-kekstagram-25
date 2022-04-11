import {similarListPhotos} from './thumbnails.js';
import {showAlert} from './util.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    similarListPhotos(photos);
  }).catch(() => {
    showAlert('Не удалось загрузить фото!');
  });


