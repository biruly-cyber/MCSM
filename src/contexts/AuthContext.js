import React, { createContext, useState } from 'react';
import axios from 'axios';
import { server_url } from '../App';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    });

    const loadUser = async () => {
        if (localStorage.token) {
            // setAuthToken(localStorage.token);
            localStorage.setItem('token', localStorage.token);
        }

        try {
            const res = await axios.get(`${server_url}/api/users`);
            setAuth({
                ...auth,
                isAuthenticated: true,
                loading: false,
                user: res.data
            });
        } catch (err) {
            setAuth({
                ...auth,
                isAuthenticated: false,
                loading: false
            });
        }
    };

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${server_url}/api/users/register`, formData, config);
            localStorage.setItem('token', res.data.token);
            setAuth({
                ...auth,
                token: res.data.token,
                isAuthenticated: true,
                loading: false
            });
            loadUser();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${server_url}/api/users/login`, formData, config);
            localStorage.setItem('token', res.data.token);
            setAuth({
                ...auth,
                token: res.data.token,
                isAuthenticated: true,
                loading: false
            });
            loadUser();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
        });
    };

    return (
        <AuthContext.Provider value={{ auth, register, login, logout, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
