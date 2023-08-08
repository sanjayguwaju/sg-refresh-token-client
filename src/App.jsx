import { useState, useContext, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './AuthProvider';
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'
import UpdateTodo from './components/UpdateTodo'

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/" element={!isLoggedIn ? <Navigate to="/login" replace /> : <TodoList />} />
        <Route path="/update/:id" element={!isLoggedIn ? <Navigate to="/login" replace /> : <UpdateTodo />} />
      </Routes>
  )
}

export default App
