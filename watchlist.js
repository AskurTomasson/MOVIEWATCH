const placeholderTitle = document.getElementById('placeholder-title')
const watchlistContainer = document.getElementById('movie-render') 
const apiKey = "5e8f8921"
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

// FETCHING MOVIES BY ID AND RENDERING THEM TO PAGE //
for(movieId of watchlist) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`)
        .then(res => res.json())
        .then(data => {
            placeholderTitle.style.display = "none"

            document.addEventListener('click', (e) => {
                if(e.target.dataset.watchlistbtn === `${data.imdbID}`) {
                    removeFromWatchlist(e.target.dataset.watchlistbtn)
                }
                if(e.target.dataset.readmorebtn === `${data.imdbID}`) {
                    document.getElementById(`${data.imdbID}-plot`).innerHTML = `
                        ${data.Plot} 
                        <button class="read-more-btn" data-readlessbtn="${data.imdbID}">Read less</button>`
                }
                if(e.target.dataset.readlessbtn === `${data.imdbID}`) {
                    document.getElementById(`${data.imdbID}-plot`).innerHTML = `
                    ${data.Plot.slice(0, 200)} 
                    <button class="read-more-btn" data-readmorebtn="${data.imdbID}">...Read more</button>`
                }
            })

            let plot = `
                    ${data.Plot.slice(0, 200)} 
                    <button class="read-more-btn" data-readmorebtn="${data.imdbID}">...Read more</button>`
                
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
                                <i data-watchlistbtn="${data.imdbID}" class="fa fa-light fa-circle-minus"></i>remove</button>
                            </div>
                            <p id="${data.imdbID}-plot" class="data-plot">${plot}</p>
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
