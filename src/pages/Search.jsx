import { useState, useEffect } from 'react';
import { useSearchParams} from "react-router-dom";
import MovieComponent from "../components/MovieComponent.jsx";

import './styles/movieGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getMovie = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        setMovies(data.results);
    };

    useEffect(() => {
        const search = `${searchURL}?${apiKey}&query=${query}`;

        getMovie(search);
    }, [query]);

    return (
        <div className="container">
            <h2 className="container__title">Results for: <span className="query__text">{query}</span> </h2>
            <div className="container__movies">
                {movies.length === 0 ? <p>Loading...</p> : (
                    movies.map((movie) => (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};
export default Search;