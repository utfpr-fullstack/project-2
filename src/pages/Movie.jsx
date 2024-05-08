import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMovieSearch from '../hooks/useMovieSearch'; 

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WalletIcon from '@mui/icons-material/Wallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';

import './styles/movieDetails.css';

const Movie = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { movies: movieDetails } = useMovieSearch(); 

    const getMovieDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulação de uma busca assíncrona
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Definindo detalhes do filme
            const movieDetail = {
                id: id,
                title: `Movie ${id}`,
                overview: `Overview for Movie ${id}`,
                tagline: `Tagline for Movie ${id}`,
                budget: 1000000,
                revenue: 2000000,
                runtime: 120,
            };

            setMovieDetails(movieDetail);
        } catch (error) {
            setError('Failed to fetch movie details. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [id]);

    return (
        <div className="movie__page">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movieDetails && (
                <>
                    <MovieComponent movie={movieDetails} showLink={false} />
                    <p className="movie__resume">{movieDetails.tagline}</p>
                    <div className="movie__info">
                        <h3>
                            <WalletIcon/> Budget:
                        </h3>
                        <p>{formatCurrency(movieDetails.budget)}</p>
                        <h3>
                            <AttachMoneyIcon/> Revenue:
                        </h3>
                        <p>{formatCurrency(movieDetails.revenue)}</p>
                        <h3>
                            <AccessTimeIcon/> Runtime:
                        </h3>
                        <p>{movieDetails.runtime} minutes</p>
                        <h3>
                            <DescriptionIcon/> Overview:
                        </h3>
                        <p>{movieDetails.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movie;
