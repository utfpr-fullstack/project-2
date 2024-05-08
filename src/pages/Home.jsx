import React, { useState, useEffect } from 'react';
import MovieComponent from "../components/MovieComponent";
import './styles/movieGrid.css';

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const movieURL = import.meta.env.VITE_API;
    const apiKey = import.meta.env.VITE_API_KEY;

    const getTopMovies = async () => {
        try {
            const response = await fetch(`${movieURL}movie/top_rated?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch top movies');
            }
            const data = await response.json();
            setTopMovies(data.results);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        getTopMovies();
    }, []);

    return (
        <div className="container">
            <h2 className="container__title">Best Movies:</h2>
            <div className="container__movies">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && topMovies.map((movie) => <MovieComponent key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Home;
