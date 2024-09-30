import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import { useNavigate } from 'react-router-dom'; // For navigation

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // This will handle navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
  
      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token); // Assuming response.data.token contains the JWT
  
      // Redirect user based on their role
      if (response.data.role === 'APPLICANT') {
        navigate('/applicant-dashboard');
      } else if (response.data.role === 'EMPLOYEE') {
        navigate('/employee-dashboard'); // Redirect to Employee Dashboard
      } else if (response.data.role === 'ADMIN') {
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
