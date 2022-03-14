const messageList = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.'
];

const description = [
  'Мне понравилась эта фотография, потому что она передаёт чувства и эмоции присутствующих на ней людей.',
  'прекрасную атмосферу летнего вечера.',
  'Всё отлично!'
];

const namesList =  [
  'Иван',
  'Роман',
  'Мария',
  'Светлана',
  'Федор',
  'Екатерина',
  'Максим'
];

function getRandomNumber(min, max){
  if (min < 0 && min >= max) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

export {messageList, description, namesList, getRandomNumber, getRandomArrayElement, isValidLength};
