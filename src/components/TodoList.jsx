import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const {isLoggedIn, logOut} = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/todos/getusertodo', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(res.data);
            });
    }, []);

    return (
        <div>
            <nav>{isLoggedIn && <button onClick={logOut}>Log Out</button>}</nav>
            <h1>Todos</h1>
            {todos.map((todo, index) => (
                <p key={index}>{todo.content}</p>
            ))}
        </div>
    );
}

export default TodoList;
