import { Link } from 'react-router-dom';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import SearchIcon from '@mui/icons-material/Search';
const Nav = () => {
    return (
        <nav id="navbar">
            <h2>
                <Link to="/"><CameraIndoorIcon fontSize="large" /> MovieAPI</Link>
            </h2>
            <form>
                <input type="search" placeholder="Digite o nome do filme" />
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