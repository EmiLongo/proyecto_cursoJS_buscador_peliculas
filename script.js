const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const apiKey = '06f9b97f23b956e38803d48ea2074b7b';
const urlbase = 'https://api.themoviedb.org/3/search/movie';
const urlImg = 'https://image.tmdb.org/t/p/w500';
const resultsContainer = document.getElementById('resultsContainer');

searchButton.addEventListener('click', searchMovies);

function searchMovies(){
    resultsContainer.innerHTML='<p>Loading...</p>';
    fetch(`${urlbase}?query=${searchInput.value}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results)); //el array que contiene la info esta en el objeto results
}

function displayMovies(movies){
    resultsContainer.innerHTML='';
    if(movies.length == 0){
        resultsContainer.innerHTML = '<p>No se encontraron películas con los parámetros especificados</p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        let movieRelease = document.createElement('p');
        movieRelease.textContent = `La fecha de lanzamiento fue: ${movie.release_date}`;

        let movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;

        let movieImg = document.createElement('img');
        movieImgPath = urlImg + movie.poster_path;
        movieImg.src = movieImgPath;

        movieDiv.appendChild(movieImg);
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieRelease);
        movieDiv.appendChild(movieOverview);
        resultsContainer.appendChild(movieDiv);
    });
}