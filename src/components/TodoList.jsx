import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(res.data);
            });
    }, []);

    return (
        <div>
            <h1>Todos</h1>
            {todos.map((todo, index) => (
                <p key={index}>{todo.content}</p>
            ))}
        </div>
    );
}

export default TodoList;
