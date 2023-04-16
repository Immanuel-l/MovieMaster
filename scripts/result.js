var url_string = window.location;
var url = new URL(url_string)
var id = url.searchParams.get("id");


const movie_title = document.querySelector(".title");
const poster = document.querySelector(".poster");
const vote_average = document.querySelector(".vote_average");
const overview = document.querySelector(".overview");


const API_KEY = "api_key=b91afbd28e2bdc66c587c96ade03deb9";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/movie/" + id + "?" + API_KEY + "&language=de-DE";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

console.log(API_URL);

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        let title = data.title;
        document.title = title;
        movie_title.innerHTML = title;
        poster.src = IMG_URL + data.poster_path;
        vote_average.innerHTML = data.vote_average;
        overview.innerHTML = data.overview;
    })
}


getMovie(API_URL);