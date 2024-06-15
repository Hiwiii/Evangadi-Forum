import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../App';

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppState);

    useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Clear user state
    setUser({});
    
    // Redirect to the login page after 2 seconds
    setTimeout(() => {
        navigate('/login');
    }, 2000);
    }, [navigate, setUser]);

    return (
    <div>
        <h1>Logged out successfully</h1>
    </div>
    );
};

export default Logout;
