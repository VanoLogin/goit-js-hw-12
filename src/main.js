import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

// Додатковий імпорт стилів

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import * as pixabayService from './js/pixabay-api.js';
import appendCards from './js/render-functions.js';
import buttonService from './js/helpers-btn.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  cssLoading: document.querySelector('.loader-container'),
};

const queryParams = {
  page: 1,
  queryValue: '',
  perPage: 15,
};

const lightbox = new SimpleLightbox('.photo-card a');

refs.searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  refs.cssLoading.classList.remove('hidden');
  refs.galleryContainer.innerHTML = '';
  buttonService.hide();
  queryParams.page = 1;
  queryParams.queryValue =
    event.currentTarget.elements.searchQuery.value.trim();

  fetchPictures()
    .then(data => {
      if (!data) {
        throw new Error('no data');
      }
      iziToast.info({
        position: 'topRight',
        title: 'Info',
        message: `Hooray! We found ${data.totalHits} images.`,
      });
      refs.cssLoading.classList.add('hidden');
      buttonService.show();
      refs.loadBtn.addEventListener('click', handleLoadMore);
    })
    .catch(err => console.log(err))
    .finally(() => {
      refs.searchForm.reset();
    });
}

function handleLoadMore() {
  buttonService.disable();
  queryParams.page += 1;
  refs.cssLoading.classList.remove('hidden');
  fetchPictures().then(buttonService.enable);
  refs.cssLoading.classList.add('hidden');
}
async function fetchPictures() {
  try {
    const { data } = await pixabayService.getPictures(queryParams);
    const allPages = Math.ceil(data.totalHits / queryParams.perPage);
    console.log(allPages);
    console.log(data);
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    appendCards(data.hits, refs.galleryContainer);
    lightbox.refresh();
    scrollToNextBatch();

    if (data.totalHits <= queryParams.perPage) {
      iziToast.info({
        position: 'topRight',
        title: 'Info',
        message: `Hooray! We found ${data.totalHits} images.`,
      });
      refs.cssLoading.classList.add('hidden');

      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (queryParams.page >= allPages) {
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }

    return data;
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: `${error.message}`,
    });
    buttonService.hide();
    return false;
  }
}

function scrollToNextBatch() {
  const cards = document.querySelectorAll('.photo-card');
  if (cards.length > 0) {
    // Отримуємо висоту однієї карточки
    const cardHeight = cards[0].getBoundingClientRect().height;
    // Прокручуємо на дві висоти карточки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
