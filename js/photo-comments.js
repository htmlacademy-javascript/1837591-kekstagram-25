const bigPicture = document.querySelector('.big-picture');
const imageContainer = bigPicture.querySelector('.big-picture__img');
const image = imageContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsElements = bigPicture.querySelector('.social__comments');
const bodyELement = document.querySelector('body');
const descriptionElement = document.querySelector('.social__caption');
const cancelButtonElement = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector(' .social__comment-count');


const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  const imageElement = document.createElement('img');
  const textElement = document.createElement('p');
  commentElement.classList.add('social__comment');
  imageElement.classList.add('social__picture');
  imageElement.width = 35;
  imageElement.height = 35;
  imageElement.src = comment.avatar;
  imageElement.alt = comment.name;
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;
  commentElement.appendChild(imageElement);
  commentElement.appendChild(textElement);
  return commentElement;
};


const closePopup = () => {
  bigPicture.classList.add('hidden');
  bodyELement.classList.remove('modal-open');
  cancelButtonElement.removeEventListener('click', closePopup);
};

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

const openPopupAndFillContent = (photo) => {
  bodyELement.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  socialCommentsElements.innerHTML = '';
  image.src = photo.url;
  likesCount.textContent = photo.likes.toString();
  commentsCount.textContent = photo.comments.length.toString();
  descriptionElement.textContent = photo.description;
  cancelButtonElement.addEventListener('click', closePopup);
  photo.comments.forEach((comment) => socialCommentsElements.appendChild(createCommentElement(comment)));

};

export {openPopupAndFillContent};
