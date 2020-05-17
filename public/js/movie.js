import { apiKey } from './config.js';

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
        params: {
            api_key: apiKey,
            append_to_response: 'videos'
        }
    })
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let detailOutput = `
        <div class="row my-4">
            <div class="col-md-12 title">
                <h2>${movie.title}</h2>
            </div>
            <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror="this.src='https://picsum.photos/200/300'" class="img-thumbnail" alt="">
            </div>
            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Running Time:</strong> ${movie.runtime} minutes</li>
                    <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
                    <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}</li>


                </ul>
            </div>
        </div>
        `;

        if(movie.videos.results.length) {
            let trailerOutput = `
            <h2>Trailer</h2>
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movie.videos.results[0].key}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
            `;
            $('#trailer').html(trailerOutput);
        }

        let imdbLink = `
         <div class="row">
         <button type="button" class="btn btn-link">
            IMDb page:
             <a href="https://www.imdb.com/title/${movie.imdb_id}/">
                <img src="images/imdb_icon.png" width="30" height="30" alt="">
             </a>
         </button>
         </div>
        `

        $('#movie').html(detailOutput);
        $('#imdb').html(imdbLink)
        
    })
    .catch((err) => {
        console.log(err)
    })

}

getMovie();

