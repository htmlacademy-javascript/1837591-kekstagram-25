import {validateHashtag, validateComment} from './validation.js';

const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const imgUploadCancelButton = form.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const hashTagInput = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'setup-wizard-form__error-text',
});

pristine.addValidator(textDescription, validateComment, 'превышен максимальный лимит комментария', 1, false);
pristine.addValidator(hashTagInput, validateHashtag, 'Ошибка', 1, false);

const onClosePopup = () => {
  imgUpload.classList.add('hidden');
  imgUploadCancelButton.removeEventListener('click', onClosePopup);
};


const isFocusedElement = (elem) => document.activeElement === elem;


const onOpenPopup = () => {
  imgUpload.classList.remove('hidden');
  imgUploadCancelButton.addEventListener('click', onClosePopup);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !isFocusedElement(textDescription) && !isFocusedElement(hashTagInput)) {
      onClosePopup();
    }
  });
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
