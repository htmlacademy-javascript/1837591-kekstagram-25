import {renderSimilarListPhotos, clearPhotos} from './thumbnails.js';
import {getPhotos} from './data.js';
import {getRandomNumber, debounce} from './util.js';

const imgFilters = document.querySelector('.img-filters');
const imgFilterDefault = imgFilters.querySelector('#filter-default');
const imgFilterRandom = imgFilters.querySelector('#filter-random');
const imgFilterDiscussed = imgFilters.querySelector('#filter-discussed');

const RANDOM_LENGTH = 10;

const setActiveMenu = (activeElement) => {
  [imgFilterDefault, imgFilterRandom, imgFilterDiscussed].forEach((el) => {
    el.classList.remove('img-filters__button--active');
  });
  activeElement.classList.add('img-filters__button--active');
};

imgFilterDefault.addEventListener('click', debounce(() => {
  setActiveMenu(imgFilterDefault);
  clearPhotos();
  renderSimilarListPhotos(getPhotos());
}));

imgFilterRandom.addEventListener('click', debounce(() => {
  setActiveMenu(imgFilterRandom);
  clearPhotos();
  const photos = getPhotos();
  const usedIndexes = [];
  const randomPhotos = [];
  while (randomPhotos.length < RANDOM_LENGTH) {
    const index = getRandomNumber(0, photos.length);
    if (!usedIndexes.includes(index)) {
      usedIndexes.push(index);
      randomPhotos.push(photos[index]);
    }
  }
  renderSimilarListPhotos(randomPhotos);
}));

imgFilterDiscussed.addEventListener('click', debounce(() => {
  const photos = getPhotos();
  const discussed = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  setActiveMenu(imgFilterDiscussed);
  clearPhotos();
  renderSimilarListPhotos(discussed);
}));
