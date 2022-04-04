import {isValidLength} from './util.js';

const hashTagRE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const COMMENT_MAX_LENGTH = 140;
const MAX__HASHTAGS = 5;

const isValidHashtag = (hashtagString) => {
  const hashTagArray = hashtagString.split(' ').map((elem) => elem.toLowerCase());
  let isValid = true;
  hashTagArray.forEach((hashtag, idx) => {
    if(!hashTagRE.test(hashtag) || hashTagArray.length > MAX__HASHTAGS) {
      isValid = false;
    }
    for (let i = idx + 1; i < hashTagArray.length; i++) {
      if (hashTagArray[i] === hashtag) {
        isValid = false;
      }
    }
  });
  return isValid;
};

const validateComment = (comments) => isValidLength(comments, COMMENT_MAX_LENGTH);

export {isValidHashtag, validateComment};
