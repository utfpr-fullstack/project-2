import { useState } from 'react';

const useMovieSearch = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchMovies = async (query) => {
        setLoading(true);
        setError(null);

        try {
          
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            
            const randomMovies = Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                title: `Movie ${index + 1}`,
                overview: `Overview for Movie ${index + 1}`,
            }));

            setMovies(randomMovies);
        } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { movies, loading, error, searchMovies };
};

export default useMovieSearch;