import { API_KEY, BASE_URL, IMG_URL } from './api.js';

const moviesContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

async function loadPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750'}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p class="rating">⭐ ${movie.vote_average}</p>
      </div>
    `;
    card.addEventListener("click", () => openMovie(movie.id));
    moviesContainer.appendChild(card);
  });
}

async function openMovie(movieId) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = "<p style='text-align:center;'>Loading Details...</p>";
  
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await res.json();
  
  // Notice we only update modalBody. The close button stays in the HTML!
  modalBody.innerHTML = `
    <img src="${IMG_URL + movie.poster_path}" style="width:100%; border-radius:10px; margin-bottom:15px;"/>
    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">${movie.title}</h2>
    <p style="color: #facc15; font-weight: bold; margin-bottom: 10px;">⭐ ${movie.vote_average.toFixed(1)}</p>
    
    <button onclick="addToWatchlist(${movie.id}, '${movie.title.replace(/'/g, "\\'")}', '${movie.poster_path}')" class="add-btn">
      + Add to Your Hive
    </button>
    
    <div style="margin-top: 15px;">
      <h4 style="color: #94a3b8; margin-bottom: 5px;">Overview</h4>
      <p style="line-height: 1.6; font-size: 0.95rem;">${movie.overview}</p>
    </div>
  `;
}
searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();
  if (!query) return loadPopularMovies();
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  displayMovies(data.results);
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
loadPopularMovies();