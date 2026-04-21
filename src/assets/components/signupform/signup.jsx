import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signupform() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [city, setCity] = useState('');
        const [college, setCollege] = useState('');
        const [role, setRole] = useState('user');

  const submithandler = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!username || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          course,
          city,
          college
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration Successful!');

        // ✅ redirect to homepage
        navigate('/');

      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={submithandler}>

        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            <option value="btech">B.Tech</option>
            <option value="mca">MCA</option>
            <option value="bca">BCA</option>
            <option value="mba">MBA</option>
          </select>
        </div>

        <div className="form-group">
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            <option value="bareilly">Bareilly</option>
            <option value="delhi">Delhi</option>
            <option value="lucknow">Lucknow</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>

        <div className="form-group">
          <select value={college} onChange={(e) => setCollege(e.target.value)}>
            <option value="">Select College</option>
            <option value="itm">ITM College</option>
            <option value="mit">MIT</option>
            <option value="amity">Amity University</option>
            <option value="du">Delhi University</option>
          </select>
        </div>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" onClick={() => setRole('user')}>Sign up</button>
        

      </form>
    </div>
  );
}

export default Signupform;