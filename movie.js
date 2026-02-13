const API_KEY2 = "0c1c9a2cd21839a42ec75257c1ec1a04";
const BASE2 = "https://api.themoviedb.org/3";
const IMG2 = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadMovie() {
  const res = await fetch(`${BASE2}/movie/${id}?api_key=${API_KEY2}&append_to_response=videos`);
  const m = await res.json();

  const trailer = m.videos.results.find(v => v.type === "Trailer");

  document.getElementById("moviePage").innerHTML = `
    <div style="display:flex; gap:40px; padding:40px; flex-wrap:wrap;">

      <div>
        <img src="${IMG2}${m.poster_path}" width="260" />
        <p>⭐ ${m.vote_average}</p>
        <button onclick="addToWatchlist(${m.id}, '${m.title}', '${m.poster_path}')">
          Add to Watchlist
        </button>
      </div>

      <div style="flex:1; min-width:300px;">
        <h1>${m.title}</h1>
        ${trailer ? `<iframe width="100%" height="420" src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>` : ""}
      </div>

    </div>
  `;
}

loadMovie();