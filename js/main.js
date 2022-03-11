let commentId = 1;
let photoID = 0;

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

// eslint-disable-next-line
getRandomNumber(1, 100);

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

// eslint-disable-next-line
isValidLength('hello', 140);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomComment = function() {
  return {
    id: ++commentId,
    avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
    message: Array.from({length: getRandomNumber(1, 3)}, () => getRandomArrayElement(messageList)).join(' '),
    name: getRandomArrayElement(namesList)
  };
};

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
