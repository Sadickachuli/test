const recommendButton = document.getElementById('recommendButton');
const genreSelect = document.getElementById('genre');
const movieList = document.getElementById('movieList');

const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDb API key

recommendButton.addEventListener('click', () => {
    const selectedGenre = genreSelect.value;
    getRecommendations(selectedGenre);
});

async function getRecommendations(genre) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
        `;
        movieList.appendChild(movieDiv);
    });
}
