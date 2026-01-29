import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import { PER_PAGE } from './js/pixabay-api';

const form = document.querySelector('form');
const userInput = document.querySelector('input');
const loadMoreButton = document.querySelector('.load-more-button');
let page;
let query = '';
let totalHits = 0;
let data;

form.addEventListener('submit', handleForm);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleForm(event) {
  event.preventDefault();
  page = 1;
  query = userInput.value.trim();
  if (query === '') {
    return;
  }
  clearGallery();
  hideLoadMoreButton();
  renderGallery();
}

function handleLoadMore() {
  page += 1;
  hideLoadMoreButton();
  renderGallery();
}

async function renderGallery() {
  showLoader();
  try {
    data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);
    if (page > 1) {
      smoothScroll();
    }
    if (PER_PAGE * page >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    if (!error.response) {
      iziToast.warning({ message: 'Please, try again later' });
      return;
    }
    iziToast.warning({ message: `${error.response.status}` });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) {
    return;
  }
  const cardHeight = galleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: 2 * cardHeight,
    behavior: 'smooth',
  });
}