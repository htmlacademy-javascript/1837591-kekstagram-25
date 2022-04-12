import {openPopupAndFillContent} from './photo-comments.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictureTemplate  = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');

const clearPhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  for (const picture of pictures) {
    picture.remove();
  }
};

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
  imgFilters.classList.remove('img-filters--inactive');
};


export {renderSimilarListPhotos, clearPhotos};
