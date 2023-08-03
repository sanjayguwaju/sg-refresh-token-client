import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

function Register() {
    const { isLoggedIn, logIn } = useContext(AuthContext);
    console.log("Register Page", isLoggedIn);

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

    const register = () => {
        axios.post('http://localhost:3000/api/user/register', { username, password })
            .then(res => {
                // handle registration success
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;
