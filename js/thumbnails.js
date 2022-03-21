import {photoContent} from './decription-photo.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictureTemplate  = document.querySelector('#picture').content.querySelector('.picture');

const pictureElement = similarPictureTemplate.cloneNode(true);
picturesContainer.appendChild(pictureElement);

const similarPhoto = photoContent();
const similarListFragment = document.createDocumentFragment();

similarPhoto.foreach((url, likes, comments) => {
  const photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments;
  picturesContainer.appendChild(photoElement);
  similarListFragment.appendChild(photoElement);
}
);
similarListFragment.appendChild(picturesContainer);
