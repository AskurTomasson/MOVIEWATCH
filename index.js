const searchInput = document.getElementById('movie-search')
const searchBtn = document.getElementById('search-btn')
const renderMovie = document.getElementById('movie-render')
const apiKey = "5e8f8921"
let imdbIdArray = []


searchBtn.addEventListener('click', getSearchedMovies)



function getSearchedMovies() {

    // GET ALL SEARCH RESPONSES FROM INPUT VALUE //
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
    .then(resp => resp.json())
    .then(data => {
        if(data.Search) {
            // PUSHING ALL UNIQUE SEARCH REPONSES IDS TO ARRAY //
            for(let ids of data.Search) {
                imdbIdArray.push(ids.imdbID)
            }
        } else {
            renderMovie.innerHTML = `
            <p>Unable to find what you're looking for.</p>`
        }
        
    })

    // LOOPING OVER imdbIdArray TO SEND REQUEST ON EACH UNIQUE ID //
    .then(() => {
        for(let id of imdbIdArray) {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
            .then(resp => resp.json())
            .then(data => {
                imdbIdArray = []

                if (data.Rated != "N/A" && data.Runtime != "N/A") {
                // GIVE WATCHLIST BUTTON THE CONNECTED IDS OF THE RESPONSES //
                document.addEventListener('click', (e) => {
                    if(e.target.dataset.watchlistbtn === `${data.imdbID}`) {
                        addToWatchList(e.target.dataset.watchlistbtn)
                        document.getElementById(`${data.imdbID}`).innerHTML = "added"
                    }
                })

                renderMovie.innerHTML += `
                    <div class="card">
                        <img class="data-poster" src="${data.Poster}">
                        <div class="card-info">
                            <div class="top-card-div">  
                                <h3 class="data-title">${data.Title}</h3>
                                <p class="data-rating">⭐${data.imdbRating}</p>
                            </div>
                            <div class="mid-card-div">
                                <p class="data-runtime">${data.Runtime}</p>
                                <p class="data-genre">${data.Genre}</p>
                                <button id="${data.imdbID}" data-watchlistbtn="${data.imdbID}" class="data-btn">
                                <i class="fa fa-light fa-circle-plus"></i>watchlist</button>
                            </div>
                            <p class="data-plot">${data.Plot}</p>
                        </div>
                    </div>
                    <hr>`
                }
            })
        }
    })

    // CLEAR INPUT AND RENDER //
    searchInput.value = ""
    renderMovie.innerHTML = ""
}

// THE ID OF THE MOVIE TO ADD IS GIVEN TO US/CONNECTED WITH idOfMovie //
// BY CALLING THE FUNCTION WITH THE DATASET SET TO EACH UNIQUE ID OF RESPONSE //
const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

function addToWatchList(idOfMovie) {
    if(!watchlist.includes(idOfMovie)) {
        watchlist.push(idOfMovie)
        localStorage.setItem(`watchlist`,JSON.stringify(watchlist))
        console.log(`${watchlist}`)
    }
}