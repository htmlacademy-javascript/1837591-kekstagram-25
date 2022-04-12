import {renderSimilarListPhotos} from './thumbnails.js';
import {showAlert} from './util.js';
import {setPhotos} from './data.js';

const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

fetch(GET_URL)
  .then((response) => response.json())
  .then((photos) => {
    setPhotos(photos);
    renderSimilarListPhotos(photos);
  })
  .catch(() => {
    showAlert('Не удалось загрузить фото!');
  });

const sendData = (data, onSuccess, onError) => {
  fetch(POST_URL,
    {
      method: 'POST',
      body: data,
    })
    .then((response) => response.ok ? onSuccess() : onError())
    .catch(() => onError());
};

export {sendData};
