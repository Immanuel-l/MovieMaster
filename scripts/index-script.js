    const carousel = document.querySelector(".carousel");
    const carousel2 = document.querySelector(".carousel2");
    let firstImg;
    const arrowIcons = document.querySelectorAll(".wrapper i");
/************************** TMDB API ******************/

    const API_KEY = "api_key=b91afbd28e2bdc66c587c96ade03deb9";
    const BASE_URL = "https://api.themoviedb.org/3";
    const MOVIE_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY + "&language=de-DE";
    const TV_URL = BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY + "&language=de-DE&with_original_language=en";
    const IMG_URL = "https://image.tmdb.org/t/p/w500";

    console.log(MOVIE_URL);

    function getMovies(url) {
        fetch(url).then(res => res.json()).then(data => {
            showMovies(data.results);
            console.log(data.results);
        })
    }

    function getTV(url) {
        fetch(url).then(res => res.json()).then(data => {
            showTV(data.results);
            console.log(data.results);
        })
    }

    function showMovies(data) {
        data.forEach((movie, index) => {
            const {poster_path, id} = movie;
            let img = document.createElement("img");
            img.src = IMG_URL + `${poster_path}`;
            let a = document.createElement("a");
            a.href = "./result.html?movie=1&id=" + `${id}`;
            carousel.appendChild(a);
            a.appendChild(img);

            if(index === 0) {
                firstImg = img;
            }
        })
    }

    function showTV(data) {
        data.forEach((movie, index) => {
            const {poster_path, id} = movie;
            let img = document.createElement("img");
            img.src = IMG_URL + `${poster_path}`;
            let a = document.createElement("a");
            a.href = "./result.html?tv=1&id=" + `${id}`;
            carousel2.appendChild(a);
            a.appendChild(img);

            if(index === 0) {
                firstImg = img;
            }
        })
    }

    

    getMovies(MOVIE_URL);
    getTV(TV_URL);


/************************** Image Carousel ******************/

let isDragStart= false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    if(carousel.scrollLeft == 0) {
        arrowIcons[0].style.display = "none";
    } else {
        arrowIcons[0].style.display = "block";
    }

    if(carousel.scrollLeft == scrollWidth) {
        arrowIcons[1].style.display = "none";
    } else {
        arrowIcons[1].style.display = "block";
    }
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 48; //getting first img width & adding 18 margin value
        // if clicked icon is left, recduce width value from the carousel scroll left else add to it
        if(icon.id == "left") {
            carousel.scrollLeft -= firstImgWidth*5;
         } else {
                carousel.scrollLeft += firstImgWidth*5;
            }
        
        setTimeout( () => showHideIcons(), 60); // calling showHideIcons after 60ms;
    })
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 48;
    // getting differnce value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth*5 - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart= true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart= false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);