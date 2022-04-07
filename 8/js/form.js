import {isValidHashtag, validateComment} from './validation.js';
import {isFocusedElement} from './util.js';
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


const MINSCALE = 0.25;
const MAXSCALE = 1;
let currentScale = 1;


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
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = '';
  effectSlider.setAttribute('hidden', true);
  imgUploadCancelButton.addEventListener('click', onClosePopup);
  document.addEventListener('keydown', onClosePopupHashTag);
  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

const onScaleSmaller = () => {
  if (currentScale > MINSCALE) {
    currentScale -= 0.25;
    imgUploadPreview.querySelector('img').style.transform = `scale(${currentScale})`;
    scaleValue.value = currentScale;
  }
};

const onScaleBigger = () => {
  if (currentScale < MAXSCALE) {
    currentScale += 0.25;
    imgUploadPreview.querySelector('img').style.transform = `scale(${currentScale})`;
    scaleValue.value = currentScale;
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
    effectSlider.setAttribute('hidden', true);
  }
});

effectsList.addEventListener('change', (evt) => {
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  effectSlider.noUiSlider.updateOptions(dataEffects[evt.target.value]);
});


uploadFile.addEventListener('change', (evt) => {
  if (!evt.target.files[0]) {
    return;
  }
  onOpenPopup();
});
