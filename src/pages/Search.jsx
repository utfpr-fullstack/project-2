import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import MovieComponent from "../components/MovieComponent.jsx";

import './styles/movieGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = searchParams.get("q");

    const getMovies = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${searchURL}?${apiKey}&query=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            getMovies();
        }
    }, [query]);

    return (
        <div className="container">
            <h2 className="container__title">Results for: <span className="query__text">{query}</span> </h2>
            <div className="container__movies">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    movies.map((movie) => (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
