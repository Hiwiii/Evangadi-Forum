import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout';
import Navbar from './pages/Navbar';
import { useEffect, useState, createContext } from 'react';
import axios from './pages/axiosConfig';

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate= useNavigate();
  async function checkUser() {
    try {
      const { data }= await axios.get('/users/check', {
        headers: {
          Authorization: 'Bearer ' + token
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login')
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    }
  }, [token]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App
