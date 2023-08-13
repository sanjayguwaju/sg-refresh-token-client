import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState("");
    const [newTodo, setNewTodo] = useState("");
    const { isLoggedIn, logOut } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.SERVER_APP_URL}/api/todos/getusertodo`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(res.data);
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.SERVER_APP_URL}/api/user/username`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setUsername(res.data.username);
            });
    }, []);

    const addTodo = () => {
        const token = localStorage.getItem('token');
        axios.post(`${process.env.SERVER_APP_URL}/api/todos/createusertodo`, { content: newTodo }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(prevTodos => [...prevTodos, res.data]);
                setNewTodo("");
            });
    };

    const deleteTodo = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.SERVER_APP_URL}/api/todos/deleteusertodo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err=>{
                console.error("Error deleting todo:",err);
            });
    };

    return (
        <div>
            <h2>Welcome {username}</h2>
            <nav>{isLoggedIn && <button onClick={logOut}>Log Out</button>}</nav>
            <h1>Todos</h1>
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            <button onClick={addTodo}>Create</button>
            {todos.map((todo, index) => (
                <div key={index}>
                    <p>{todo.content}</p>
                    <p>Created at - {new Date(todo.timestamp).toLocaleDateString()}</p>
                    <button><Link to={`/update/${todo._id}`}>Update</Link></button>
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
export default TodoList;
