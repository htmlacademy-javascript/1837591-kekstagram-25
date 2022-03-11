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

const description = [
  'Мне понравилась эта фотография, потому что она передаёт чувства и эмоции присутствующих на ней людей, /прекрасную атмосферу летнего вечера.'
];

const comments = [
  { id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артём',
  }
];

const descriptionPhoto = () => {
  const getRandomUrlIndex = getRandomNumber(0, url.length - 1);
  const getRandomDecriptionIndex = getRandomNumber(0, description.length - 1);
  return {
    getUrl: url[getRandomUrlIndex],
    getDesctription: description[getRandomDecriptionIndex],
    getLikes: getRandomNumber(1, 100),
    getComments: [ {
      id: getRandomNumber(1, 25),
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём'},
    {
      id: getRandomNumber(1, 25),
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём'},
    {
      id: getRandomNumber(1, 25),
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём'
    }
    ],
  };
};
