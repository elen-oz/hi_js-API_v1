'use strict';

const appEl = document.querySelector('#app');
const wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
appEl.prepend(wrapperEl);

//*----
const titleEl = document.createElement('h1');
titleEl.classList.add('title');
titleEl.textContent = 'Trending Movies & Best Series';
wrapperEl.prepend(titleEl);

const btnContainerEl = document.createElement('div');
btnContainerEl.classList.add('btn-container');
wrapperEl.append(btnContainerEl);
//*----

const contentEl = document.createElement('div');
contentEl.classList.add('content');
wrapperEl.append(contentEl);

const movieBtnEl = document.createElement('button');
movieBtnEl.classList.add('btn');
movieBtnEl.textContent = 'Show Movies';
btnContainerEl.append(movieBtnEl);

const seriesBtnEl = document.createElement('button');
seriesBtnEl.classList.add('btn');
seriesBtnEl.textContent = 'Show Series';
btnContainerEl.append(seriesBtnEl);

const displayData = (data) => {
  contentEl.innerHTML = '';
  data.map((item) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    contentEl.append(cardEl);

    const overlayEl = document.createElement('div');
    overlayEl.classList.add('overlay');
    overlayEl.style.background = `url('https://image.tmdb.org/t/p/w500${item.backdrop_path}')`;
    overlayEl.style.backgroundPosition = 'top';
    overlayEl.style.backgroundRepeat = 'no-repeat';
    overlayEl.style.backgroundSize = 'cover';
    overlayEl.style.opacity = 0.5;
    overlayEl.style.filter = 'blur(3px)';
    cardEl.prepend(overlayEl);

    const cardTitleEl = document.createElement('h2');
    cardTitleEl.classList.add('card__title');
    cardTitleEl.textContent = `${item.title ?? item.name}`;
    cardEl.prepend(cardTitleEl);

    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    cardEl.append(cardContentEl);

    const imageEl = document.createElement('img');
    imageEl.classList.add('card__image');
    imageEl.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    imageEl.style.width = '300px';
    imageEl.style.objectFit = 'cover';
    cardContentEl.append(imageEl);

    const infoEl = document.createElement('div');
    infoEl.classList.add('card__info');
    cardContentEl.append(infoEl);

    // ---
    const addInfoEl = document.createElement('div');
    addInfoEl.classList.add('addition-info');
    infoEl.append(addInfoEl);

    const ratingEl = document.createElement('div');
    ratingEl.classList.add('card__rating');

    ratingEl.textContent = item.vote_average.toFixed(1);
    addInfoEl.append(ratingEl);

    const dateEl = document.createElement('div');
    dateEl.classList.add('card__date');
    let date = item.first_air_date ?? item.release_date;
    dateEl.textContent = `Release date:\n${date}`;
    addInfoEl.append(dateEl);

    const descriptionEl = document.createElement('div');
    descriptionEl.classList.add('card__description');
    descriptionEl.textContent = item.overview;
    infoEl.append(descriptionEl);

    const linkEl = document.createElement('a');
    linkEl.classList.add('card__link');
    let link;
    if (item.title) {
      link = item.title.split(' ').join('-');
    } else if (item.name) {
      link = item.name.split(' ').join('-');
    }
    linkEl.href = `https://www.themoviedb.org/tv/${item.id}-${link}`;
    linkEl.textContent = 'See More...';
    linkEl.target = '_blanc';
    infoEl.append(linkEl);
  });
};

const getData = async (data) => {
  const { url, options } = data;

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // console.log(result.results);

    localStorage.setItem('url', JSON.stringify(url));
    localStorage.setItem('options', JSON.stringify(options));

    displayData(result.results);
  } catch (error) {
    console.error(error);
  }
};

// const moviesData = {
//   url: 'https://imdb-top-100-movies.p.rapidapi.com/',
//   options: {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'e95c198ddemsh44ab3f49c84f874p1e97fejsn1b270adaf5ec',
//       'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
//     },
//   },
// };

// const seriesData = {
//   url: 'https://imdb-top-100-movies.p.rapidapi.com/series/',
//   options: {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'e95c198ddemsh44ab3f49c84f874p1e97fejsn1b270adaf5ec',
//       'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
//     },
//   },
// };

const seriesData = {
  url: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGYyYWY5Y2M0NzQ3OWUyODA0MzhiOTYxMDZlYjc4ZSIsInN1YiI6IjY1NTNhNzM4ZDRmZTA0MDBmZTA1NGRjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0NgS-Aalu5BLS31sz7wB4oHA6ht_SQS4-65HRmdpeB0',
    },
  },
};

const moviesData = {
  url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGYyYWY5Y2M0NzQ3OWUyODA0MzhiOTYxMDZlYjc4ZSIsInN1YiI6IjY1NTNhNzM4ZDRmZTA0MDBmZTA1NGRjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0NgS-Aalu5BLS31sz7wB4oHA6ht_SQS4-65HRmdpeB0',
    },
  },
};

const storedUrl = JSON.parse(localStorage.getItem('url'));
const storedOptions = JSON.parse(localStorage.getItem('options'));

if (storedUrl && storedOptions) {
  getData({ url: storedUrl, options: storedOptions });
}

movieBtnEl.addEventListener('click', () => {
  getData(moviesData);
});

seriesBtnEl.addEventListener('click', () => {
  getData(seriesData);
});
