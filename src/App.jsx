import { useState, useContext, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './AuthProvider';
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("hellooooooo",isLoggedIn);

  return (
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/" element={!isLoggedIn ? <Navigate to="/login" replace /> : <TodoList />} />
      </Routes>
  )
}

export default App
