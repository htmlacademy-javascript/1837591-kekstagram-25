import {getRandomArrayElement, getRandomNumber, getRandomComment} from 'util.js';
import {description} from 'data.js';
let photoID = 0;

const descriptionPhoto = function() {
  ++photoID;
  return {
    id: photoID,
    url: `photos/${photoID}.jpg`,
    description:  getRandomArrayElement(description),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length:getRandomNumber(1, 15)}, getRandomComment),
  };
};

// eslint-disable-next-line
const photoContent = Array.from({length: 25}, descriptionPhoto);

export {photoContent};
