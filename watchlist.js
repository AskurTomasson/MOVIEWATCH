const placeholderTitle = document.getElementById('placeholder-title')
const watchlistContainer = document.getElementById('movie-render') 
const apiKey = "5e8f8921"
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

// FETCHING MOVIES BY ID AND RENDERING THEM TO PAGE //
for(movieId of watchlist) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
        .then(res => res.json())
        .then(data => {
            placeholderTitle.style.display = "none"

            document.addEventListener('click', (e) => {
                if(e.target.dataset.watchlistbtn === `${data.imdbID}`) {
                    removeFromWatchlist(e.target.dataset.watchlistbtn)
                }
            })
                
            watchlistContainer.innerHTML += `
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
                                <button data-watchlistbtn="${data.imdbID}" class="data-btn">
                                <i class="fa fa-light fa-circle-minus"></i>remove</button>
                            </div>
                            <p class="data-plot">${data.Plot}</p>
                        </div>
                    </div>
                    <hr>`
        })
}


function removeFromWatchlist(movieId) {
    if(watchlist.includes(movieId)) {
        watchlist.splice(watchlist.indexOf(`${movieId}`), 1)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        location.reload()
    }
}
