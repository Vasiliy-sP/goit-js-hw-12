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

let page = 1;
let currentQuery = '';
let reachedEnd = false;

form.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) {
event.preventDefault();

const newQuery = userInput.value.trim();

if (!newQuery) {
    iziToast.info({
    message: 'Введіть запит для пошуку зображень',
    });
    return;
}

// Якщо той самий запит — не перезапускаємо пошук
if (newQuery === currentQuery) {
    return;
}

currentQuery = newQuery;
page = 1;
reachedEnd = false;

clearGallery();
hideLoadMoreButton();
await renderGallery();
}

async function handleLoadMore() {
page += 1;
hideLoadMoreButton(); // ховаємо одразу, щоб уникнути багаторазових кліків
await renderGallery();
}

async function renderGallery() {
showLoader();

try {
    const response = await getImagesByQuery(currentQuery, page);
    const { hits, totalHits } = response;

    if (hits.length === 0) {
    if (page === 1) {
        iziToast.warning({
        message: 'За вашим запитом нічого не знайдено. Спробуйте інший запит.',
        });
    }
    reachedEnd = true;
    hideLoadMoreButton();
    return;
    }

    createGallery(hits);

    // Плавне прокручування тільки при завантаженні додаткових сторінок
    if (page > 1) {
    smoothScroll();
    }

    // Перевіряємо, чи досягнуто кінець колекції
    if (PER_PAGE * page >= totalHits) {
    reachedEnd = true;
    hideLoadMoreButton();
    iziToast.info({
        message: "Ви дійшли до кінця результатів пошуку.",
    });
    } else {
    showLoadMoreButton();
    }
} catch (error) {
    console.error(error);

    let message = 'Щось пішло не так. Спробуйте ще раз пізніше.';

    // Типова обробка помилок для axios
    if (error.response) {
    // Сервер відповів з кодом ≠ 2xx
    const status = error.response.status;
    if (status === 400) message = 'Некоректний запит';
    else if (status === 401 || status === 403) message = 'Помилка авторизації (перевірте API ключ)';
    else if (status === 429) message = 'Забагато запитів. Зачекайте трохи';
    else if (status >= 500) message = 'Проблема на стороні Pixabay';
    } else if (error.request) {
    // Запит зроблено, але відповіді немає (мережа, CORS, блокування тощо)
    message = 'Немає відповіді від сервера. Перевірте інтернет-з’єднання.';
    }

    iziToast.error({
    message,
    timeout: 4000,
    });

    hideLoadMoreButton();
} finally {
    hideLoader();
}
}

function smoothScroll() {
const galleryItem = document.querySelector('.gallery-item');
if (!galleryItem) return;

const { height: cardHeight } = galleryItem.getBoundingClientRect();

window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
});
}