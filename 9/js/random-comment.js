import {getRandomArrayElement, getRandomNumber,} from './util.js';
import {namesList, messageList} from './data.js';
let commentId = 1;

const getRandomComment = function() {
  return {
    id: ++commentId,
    avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
    message: Array.from({length: getRandomNumber(1, 3)}, () => getRandomArrayElement(messageList)).join(' '),
    name: getRandomArrayElement(namesList)
  };
};

export {getRandomComment};
