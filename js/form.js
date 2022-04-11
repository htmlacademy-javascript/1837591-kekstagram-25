import {isValidHashtag, validateComment} from './validation.js';
import {isFocusedElement, showAlert} from './util.js';
import {dataEffects} from './slider-effects.js';

const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const imgUploadCancelButton = form.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const hashTagInput = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const bodyElement = document.querySelector('body');

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScalleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const onCloseErrorPopup = () => {
  errorTemplate.classList.add('hidden');
  errorTemplate.removeEventListener('click', onCloseErrorPopup);
};

const onCloseEscPopupError = (evt) => {
  if (evt.key === 'Escape') {
    onCloseErrorPopup();
    document.removeEventListener('keydown', onCloseEscPopupError);
  }
};

const errorBlock = () => {
  const fragment = document.createDocumentFragment();
  errorTemplate.classList.remove('hidden');
  errorTemplate.querySelector('.error__button').addEventListener('click', onCloseErrorPopup);
  document.addEventListener('keydown', onCloseEscPopupError);
  fragment.appendChild(errorTemplate);
  bodyElement.appendChild(fragment);
};

const onCloseSuccessPopup = () => {
  successTemplate.classList.add('hidden');
  successTemplate.removeEventListener('click', onCloseSuccessPopup);
};

const onCloseEscPopupSuccess = (evt) => {
  if (evt.key === 'Escape') {
    onCloseSuccessPopup();
    document.removeEventListener('keydown', onCloseEscPopupSuccess);
  }
};

const successBlock = () => {
  const fragment = document.createDocumentFragment();
  successTemplate.classList.remove('hidden');
  successTemplate.querySelector('.success__button').addEventListener('click', onCloseSuccessPopup);
  document.addEventListener('keydown', onCloseEscPopupSuccess);
  fragment.appendChild(successTemplate);
  bodyElement.appendChild(fragment);
};

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Публиковать';
};

const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
let currentScale = 1;

const cleanFormFields = () => {
  hashTagInput.value = '';
  textDescription.value = '';
};


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
  imgUploadPreview.style.filter = '';
  imgUploadPreview.querySelector('img').style.transform = '';
  currentScale = 1;
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadCancelButton.removeEventListener('click', onClosePopup);
};

const onClosePopupHashTag = (evt) => {
  if (evt.key === 'Escape' && !isFocusedElement(textDescription) && !isFocusedElement(hashTagInput)) {
    onClosePopup();
    document.removeEventListener('keydown', onClosePopupHashTag);
  }
};
const setScaleValue = () => {
  scaleValue.value = `${currentScale * 100}%`;
};

const onOpenPopup = () => {
  imgUpload.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  effectSlider.classList.add('hidden');
  setScaleValue();
  imgUploadCancelButton.addEventListener('click', onClosePopup);
  document.addEventListener('keydown', onClosePopupHashTag);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate()) {
      evt.preventDefault();
    } else {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      fetch('https://25.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        }).then(() => {
        onClosePopup();
        successBlock();
        cleanFormFields();
        unblockSubmitButton();
      }).catch(() => {
        onClosePopup();
        errorBlock();
        cleanFormFields();
        showAlert('Не удалось загрузить фото!');
      });
    }
  });
};

const onScaleSmaller = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= 0.25;
    imgUploadPreview.querySelector('img').style.transform = `scale(${currentScale})`;
    setScaleValue();
  }
};

const onScaleBigger = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += 0.25;
    imgUploadPreview.querySelector('img').style.transform = `scale(${currentScale})`;
    setScaleValue();
  }
};

buttonScaleSmaller.addEventListener('click', onScaleSmaller);

buttonScalleBigger.addEventListener('click',  onScaleBigger);

noUiSlider.create(effectSlider, {
  range: {
    min: 1,
    max: 100,
  },
  start: 25,
  step: 25,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  const intensity = effectSlider.noUiSlider.get();
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${intensity})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${intensity})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${intensity}%)`;
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${intensity}px)`;
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${intensity})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--none'))  {
    imgUploadPreview.style.filter = '';
  }
});

effectsList.addEventListener('change', (evt) => {
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  if (evt.target.value === 'none') {
    effectSlider.classList.add('hidden');
  } else {
    effectSlider.classList.remove('hidden');
  }
  effectSlider.noUiSlider.updateOptions(dataEffects[evt.target.value]);
});


uploadFile.addEventListener('change', (evt) => {
  if (!evt.target.files[0]) {
    return;
  }
  onOpenPopup();
});
