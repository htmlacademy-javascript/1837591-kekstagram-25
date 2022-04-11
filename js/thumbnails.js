import {openPopupAndFillContent} from './photo-comments.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictureTemplate  = document.querySelector('#picture').content.querySelector('.picture');


const renderSimilarListPhotos = (similarPhotos) => {
  const fragment = document.createDocumentFragment();

  similarPhotos.forEach((photo) => {
    const photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes.toString();
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length.toString();
    photoElement.addEventListener('click', () => openPopupAndFillContent(photo));
    fragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(fragment);
};


export {renderSimilarListPhotos};
