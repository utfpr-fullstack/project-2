import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import SearchIcon from '@mui/icons-material/Search';

import './styles/nav.css';
const Nav = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if(search.trim() === "") return;
        navigate(`/search?q=${search}`);
        setSearch("");
    };

    return (
        <nav id="navbar">
            <h2>
                <Link to="/"><CameraIndoorIcon fontSize="large" /> MovieAPI</Link>
            </h2>
            <form onSubmit={submitHandler}>
                <input type="search" placeholder="Digite o nome do filme"
                       onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <button type="submit">
                    <SearchIcon sx={{ fontSize: 18 }} />
                </button>
            </form>
        </nav>
    )
}
export default Nav;

// <Link to="/movie/1">Movie</Link>
// <Link to="/search">Search</Link>