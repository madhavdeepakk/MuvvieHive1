function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
}

function saveWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}

function addToWatchlist(id, title, poster) {
  const list = getWatchlist();
  if (!list.find(m => m.id === id)) {
    list.push({ id, title, poster });
    saveWatchlist(list);
    alert("Saved to your Hive!");
  } else {
    alert("Already in your Hive!");
  }
}

function removeFromWatchlist(id) {
  const list = getWatchlist().filter(m => m.id !== id);
  saveWatchlist(list);
  displayWatchlist();
}

function displayWatchlist() {
  const container = document.getElementById("watchlistContainer");
  if (!container) return;
  const list = getWatchlist();
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  container.innerHTML = list.length === 0 ? "<p>Hive is empty.</p>" : "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${IMG_URL + movie.poster}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <button onclick="removeFromWatchlist(${movie.id})" class="remove-btn">Remove</button>
      </div>
    `;
    container.appendChild(card);
  });
}