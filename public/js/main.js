import { apiKey } from './config.js';

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/movie',{
        params: {
            api_key: apiKey ,
            query: searchText,
        }
    })
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror="this.src='https://picsum.photos/200/300'" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <a onClick="movieSelected(${movie.id})" class="btn btn-primary d-flex justify-content-center detail" href="#">Movie Details</a>
                    </div>
                </div>
            </div>
            `;
        })

        $('#movies').html(output)
    })
    .catch((err) => {
        console.log(err)
    });
}

window.movieSelected = function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
};


