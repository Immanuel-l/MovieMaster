var url_string = window.location;
var url = new URL(url_string)
var id = url.searchParams.get("id");
var movie = url.searchParams.get("movie")
var tv = url.searchParams.get("tv");

let movieortv

if(movie == 1) {
    movieortv = "/movie/"
}
if(tv == 1) {
    movieortv = "/tv/"
}


const movie_title = document.querySelector(".title");
const poster = document.querySelector(".poster");
const vote_average = document.querySelector(".vote_average");
const overview = document.querySelector(".overview");


const API_KEY = "api_key=b91afbd28e2bdc66c587c96ade03deb9";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + movieortv + id + "?" + API_KEY + "&language=de-DE";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

console.log(API_URL);

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        let title;
        if(movie == 1) {
            title = data.title;
        }
        if(tv == 1) {
            title = data.name;
        }
        document.title = title;
        movie_title.innerHTML = title;
        poster.src = IMG_URL + data.poster_path;
        vote_average.innerHTML = data.vote_average;
        overview.innerHTML = data.overview;
    })
}


getMovie(API_URL);