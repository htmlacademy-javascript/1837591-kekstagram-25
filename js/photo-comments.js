const bigPicture = document.querySelector('.big-picture');
const imageContainer = bigPicture.querySelector('.big-picture__img');
const image = imageContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsElements = bigPicture.querySelector('.social__comments');
const bodyELement = document.querySelector('body');
const descriptionElement = document.querySelector('.social__caption');
const cancelButtonElement = bigPicture.querySelector('.big-picture__cancel');


const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  const imageElement = document.createElement('img');
  imageElement.classList.add('social__picture');
  imageElement.width = 35;
  imageElement.height = 35;
  imageElement.src = comment.avatar;
  imageElement.alt = comment.name;
  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;
  commentElement.appendChild(imageElement);
  commentElement.appendChild(textElement);
  return commentElement;
};


const closePopup = () => {
  bigPicture.classList.add('hidden');
  cancelButtonElement.removeEventListener('click', closePopup);
  bodyELement.classList.remove('modal-open');
};

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

const openPopupAndFillContent = (photo) => {
  bodyELement.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', closePopup);
  bigPicture.classList.remove('hidden');
  socialCommentsElements.innerHTML = '';
  image.src = photo.url;
  likesCount.textContent = photo.likes.toString();
  commentsCount.textContent = photo.comments.length.toString();
  descriptionElement.textContent = photo.description;
  photo.comments.forEach((comment) => {
    socialCommentsElements.appendChild(createCommentElement(comment));
  });
};

export {openPopupAndFillContent};
