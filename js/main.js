function getRandomNumber(min, max){
  if (min < 0 && min >= max) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
}

getRandomNumber(1, 100);

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

isValidLength('hello', 140);
