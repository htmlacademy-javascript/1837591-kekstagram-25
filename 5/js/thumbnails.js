import {photoContent} from './decription-photo.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictureTemplate  = document.querySelector('#picture').content.querySelector('.picture');


const similarListFragment = document.createDocumentFragment();

photoContent.foreach((photo) => {
  const photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;
  similarListFragment.appendChild(photoElement);
}
);
similarListFragment.appendChild(picturesContainer);
