export const API_KEY = "0c1c9a2cd21839a42ec75257c1ec1a04";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return res.json();
}

export async function fetchMovie(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.json();
}

export async function fetchSearch(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return res.json();
}

export async function fetchReviews(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return res.json();
}