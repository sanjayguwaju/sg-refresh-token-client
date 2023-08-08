import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

function Login() {
    const { isLoggedIn, logIn } = useContext(AuthContext);

    // check if user is already logged in or has a token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            logIn();
        }
    }, [logIn]);

    // if user is already logged in, navigate them to the home page
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post('http://localhost:3000/api/user/login', { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.accessToken);
                logIn(); // sets isLoggedIn state to true
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;
