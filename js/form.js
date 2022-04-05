import {isValidHashtag, validateComment} from './validation.js';
import {isFocusedElement} from './util.js';

const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const imgUploadCancelButton = form.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const hashTagInput = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const bodyElement = document.querySelector('body');


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'form-error-text',
});

pristine.addValidator(textDescription, validateComment, 'превышен максимальный лимит комментария', 1, false);
pristine.addValidator(hashTagInput, isValidHashtag, 'Ошибка', 1, false);

const onClosePopup = () => {
  imgUpload.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', onClosePopup);
};

const onClosePopupHashTag = (evt) => {
  if (evt.key === 'Escape' && !isFocusedElement(textDescription) && !isFocusedElement(hashTagInput)) {
    onClosePopup();
    document.removeEventListener('keydown', onClosePopupHashTag);
  }
};

const onOpenPopup = () => {
  imgUpload.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imgUploadCancelButton.addEventListener('click', onClosePopup);
  document.addEventListener('keydown', onClosePopupHashTag);
  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

uploadFile.addEventListener('change', (evt) => {
  if (!evt.target.files[0]) {
    return;
  }
  onOpenPopup();
});
