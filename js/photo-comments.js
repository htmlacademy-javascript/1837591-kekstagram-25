const bigPicture = document.querySelector('.big-picture');
const imageContainer = bigPicture.querySelector('.big-picture__img');
const image = imageContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsElements = bigPicture.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const descriptionElement = document.querySelector('.social__caption');
const cancelButtonElement = bigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = bigPicture.querySelector('.social__comments-loader');
const socialCount = bigPicture.querySelector('.social__count');
const STEP = 5;
const MIN_COMMENTS = 5;
let maxVisibleComments = MIN_COMMENTS;

let onLoadMoreButtonClick = null;

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
  maxVisibleComments = MIN_COMMENTS;
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  loadMoreButton.classList.remove('hidden');
  cancelButtonElement.removeEventListener('click', closePopup);
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});

const renderComments = (comments) => {
  for (let i = maxVisibleComments - STEP; i < maxVisibleComments; i++) {
    if (!comments[i]) {
      break;
    }
    socialCommentsElements.appendChild(createCommentElement(comments[i]));
  }
};

const loadComments = (photo) => {
  maxVisibleComments += STEP;
  renderComments(photo.comments);
  socialCount.textContent = socialCommentsElements.children.length;
  if (photo.comments.length === socialCommentsElements.children.length) {
    loadMoreButton.classList.add('hidden');
  }
};

const openPopupAndFillContent = (photo) => {
  if (photo.comments.length <= MIN_COMMENTS) {
    loadMoreButton.classList.add('hidden');
  }
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  socialCommentsElements.innerHTML = '';
  image.src = photo.url;
  likesCount.textContent = photo.likes.toString();
  commentsCount.textContent = photo.comments.length.toString();
  descriptionElement.textContent = photo.description;
  cancelButtonElement.addEventListener('click', closePopup);
  renderComments(photo.comments);
  socialCount.textContent =  socialCommentsElements.children.length;
  onLoadMoreButtonClick = () => loadComments(photo);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
};

export {openPopupAndFillContent};
