
function getRandomNumber(min, max){
  if (min < 0 && min >= max) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

const isFocusedElement = (elem) => document.activeElement === elem;

export {getRandomNumber, getRandomArrayElement, isValidLength, isFocusedElement};
