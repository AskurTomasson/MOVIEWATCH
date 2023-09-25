const searchInput = document.getElementById('movie-search')
const searchBtn = document.getElementById('search-btn')
const renderMovie = document.getElementById('movie-render')
const apiKey = "5e8f8921"
let imdbIdArray = []


searchBtn.addEventListener('click', getSearchedMovies)

function getSearchedMovies() {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
    .then(resp => resp.json())
    .then(data => {
        
        if(data.Search) {
            for(let ids of data.Search) {
                imdbIdArray.push(ids.imdbID)
            }
        } else {
            renderMovie.innerHTML = `
            <p>Unable to find what you're looking for.</p>`
        }
        
    })
    .then(() => {
        for(let id of imdbIdArray) {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                renderMovie.innerHTML += `
                    <div class="card">
                    <p>${data.Title}</p>
                    </div>`
                    // CONTINUE RENDERING THE REST OF THE DATA //
            })
        }
    })
}