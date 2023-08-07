import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate,  } from 'react-router-dom';

function UpdateTodo() {
    const [todo, setTodo] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/api/todos/getusertodo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data._id === id) { // Ensure the response data's ID matches the ID from the URL
                    setTodo(res.data.content);
                } else {
                    console.error("ID mismatch");
                    // You can handle the mismatch case here, such as redirecting to an error page
                }
            });
    }, [id]);
    const updateTodo = () => {
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:3000/api/todos/updateusertodo/${id}`, { content: todo }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                navigate('/'); // Redirect to the TodoList after successful update
            });
    };

    return (
        <div>
            <h1>Update Todo</h1>
            <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
            <button onClick={updateTodo}>Update</button>
        </div>
    );
}

export default UpdateTodo;
