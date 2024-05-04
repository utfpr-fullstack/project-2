import { useState, useEffect } from 'react';
import MovieComponent from "../components/MovieComponent.jsx";
import useMovieSearch from '../hooks/useMovieSearch'; 

import './styles/movieGrid.css';

const Home = () => {
    const { movies, loading, error, searchMovies } = useMovieSearch(searchURL, apiKey); 

    const [loadedMovies, setLoadedMovies] = useState([]);
    const [limit, setLimit] = useState(10);

    useEffect(() => {

        searchMovies('top_rated');
    }, []);


    const loadMoreMovies = () => {
        setLimit(prevLimit => prevLimit + 10);
    };

    const handleSearchByEnter = (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value;
            searchMovies(searchTerm);
        }
    };

    return (
        <div className="container">
            <h2 className="container__title">Best Movies: </h2>
            <div className="container__movies">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    loadedMovies.map((movie) => (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                )}
                {loadedMovies.length < movies.length && (
                    <button onClick={loadMoreMovies}>Load More</button>
                )}
            </div>
            <div>
                <h3>Sort By:</h3>
                <button onClick={() => sortMovies('popularity')}>Popularity</button>
                <button onClick={() => sortMovies('release_date')}>Release Date</button>
               
            </div>
            <div>
                <h3>Search:</h3>
                <input type="text" placeholder="Search movies..." onKeyPress={handleSearchByEnter} />
               
            </div>
        </div>
    );
};

export default Home;
