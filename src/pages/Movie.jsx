import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WalletIcon from '@mui/icons-material/Wallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';

import MovieComponent from "../components/MovieComponent";
import './styles/movieDetails.css'

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    useEffect(() => {
        const movieUrl = `${movieURL}${id}?${apiKey}`;
        getMovie(movieUrl)
    }, []);


    return (
        <div className="movie__page">
            {movie && (
                <>
                    <MovieComponent movie={movie} showLink={false} />
                    <p className="movie__resume">{movie.tagline}</p>
                    <div className="movie__info">
                        <h3>
                            <WalletIcon/> Budget:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                        <h3>
                            <AttachMoneyIcon/> Revenue:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                        <h3>
                            <AccessTimeIcon/> Runtime:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                        <h3>
                            <DescriptionIcon/> Overview:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
};
export default Movie;