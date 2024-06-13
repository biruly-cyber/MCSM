import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'CompanyAdmin',
        company: ''
    });

    const { register } = useContext(AuthContext);

    const { username, email, password, role, company } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        register({ username, email, password, role, company });
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" value={username} onChange={onChange} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <div>
                <label>Company</label>
                <input type="text" name="company" value={company} onChange={onChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
