import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MovieComponent from "../components/MovieComponent";
import './styles/movieDetails.css';

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API}movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [id]);

    return (
        <div className="movie__page">
            {movie && (
                <>
                    <MovieComponent movie={movie} showLink={false} />
                    <p className="movie__resume">{movie.tagline}</p>
                    <div className="movie__info">
                        <h3>Budget:</h3>
                        <p>{movie.budget}</p>
                        <h3>Revenue:</h3>
                        <p>{movie.revenue}</p>
                        <h3>Runtime:</h3>
                        <p>{movie.runtime} minutes</p>
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movie;
