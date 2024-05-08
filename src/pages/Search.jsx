import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieComponent from '../components/MovieComponent';

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const searchURL = import.meta.env.VITE_SEARCH;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        if (query) {
            setLoading(true);
            setError(null);
            fetchMovies(query);
        }
    }, [query]);

    const fetchMovies = async (query) => {
        try {
            const response = await fetch(`${searchURL}?api_key=${apiKey}&query=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setMovies(data.results || []);
            setLoading(false);
        } catch (error) {
            setError('Error fetching search results');
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            window.history.replaceState(null, '', `?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <h2 className="container__title">Results for: <span className="query__text">{query}</span> </h2>
            <form onSubmit={handleSubmit}>
                <input type="search" value={searchQuery} onChange={handleChange} placeholder="Enter movie name" />
                <button type="submit">Search</button>
            </form>
            <div className="container__movies">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && movies.map((movie) => (
                    <MovieComponent key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;
