function getRandomNumber(min, max){
  if (min < 0 && min >= max) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
}

getRandomNumber(1, 100);

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

isValidLength('hello', 140);


const urlList = [];

const avatarsList = [];

const messageList = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.'
];

const description = [
  'Мне понравилась эта фотография, потому что она передаёт чувства и эмоции присутствующих на ней людей, /прекрасную атмосферу летнего вечера.'
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

const getUrl = function(urlIndex) {
  for(let i = 0; i <urlIndex.length; i++) {
    return Array.concat(urlIndex[i]);
  }
};

const getAvatars = function(avatarsIndex) {
  for(let i = 0; i <avatarsIndex.length; i++) {
    return Array.concat(avatarsIndex[i]);
  }
};

const getNonRepeatNumber = function(min, max) {
  let i;
  if (min < 0 && min >= max && (i !== i)) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
};
const getNonRepeatArrayNumber = (elements) => elements[getNonRepeatNumber(0, elements.length - 1)];
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const descriptionPhoto = () => ({
  url: getNonRepeatArrayNumber(getUrl(urlList)),
  getDesctription:  getRandomArrayElement(description),
  getLikes: getRandomNumber(15, 200),
  comments: [ {
    id: getNonRepeatNumber(1, 25),
    avatar:  getRandomArrayElement(getAvatars(avatarsList)),
    message:  getRandomArrayElement(messageList),
    name:  getRandomArrayElement(namesList)
  }
  ],
});

// eslint-disable-next-line
const similarPhotoComment = Array.from({length: 25}, descriptionPhoto);


