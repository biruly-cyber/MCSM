import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export const server_url = 'http://localhost:5000';


const App = () => { 

    const { loadUser } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
