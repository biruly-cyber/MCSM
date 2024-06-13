import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {auth.user && auth.user.username}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
