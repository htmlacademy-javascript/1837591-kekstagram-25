function getRandomNumber(min, max){
  if (min < 0 && min >= max) {
    throw new Error('значение невалидно');
  }
  return Math.floor(Math.random()*(max-min) + min);
}

getRandomNumber(1, 100);

const isValidLength = (userComment, maxLength) => userComment.length <= maxLength;

isValidLength('hello', 140);


const url = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg'
];

const avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];

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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const descriptionPhoto = () => ({
  getUrl:  getRandomArrayElement(url),
  getDesctription:  getRandomArrayElement(description),
  getLikes: getRandomNumber(1, 100),
  getComments: [ {
    id: getRandomNumber(1, 25),
    avatar:  getRandomArrayElement(avatars),
    message:  getRandomArrayElement(messageList),
    name:  getRandomArrayElement(namesList)
  }
  ],
});

const similarPhotoComment = Array.from({length: 25}, descriptionPhoto);
