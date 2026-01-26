import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Login from './components/Login';
import { fetchUser } from './utils/fetchUser';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user && window.location.pathname !== '/login') {
        navigate('/login');
      }
    };

    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />}/>
      <Route path="/*" element={<Home />}/>
    </Routes>
  );
}

export default App;
