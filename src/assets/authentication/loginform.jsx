import React, { useState } from 'react';
import './loginform.css';
import { Link, useNavigate } from 'react-router-dom';

function Loginform() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Student Login clicked");

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        navigate('/');
      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    console.log("Admin Login clicked");

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Admin login successful!");
        localStorage.setItem("token", data.token);
        navigate('/');
      } else {
        alert(data.message || "Invalid admin credentials");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="main-login-form">
      <div className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button onClick={handleLogin}>Login as Student</button>
          <button onClick={handleAdminLogin}>Login as Admin</button>
        </div>

        <div className="signup-button">
          <Link to="/login/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Loginform;

