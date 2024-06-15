import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppState } from '../App';

const Navbar = () => {
    const { user } = useContext(AppState);

    return (
    <nav>
        {user.username &&<Link to="/">Home</Link>}
        {/* {!user.username && <Link to="/login">Login</Link>}
        {!user.username && <Link to="/register">Register</Link>} */}
        {user.username && <Link to="/logout">Logout</Link>}
    </nav>
    );
};

export default Navbar;
