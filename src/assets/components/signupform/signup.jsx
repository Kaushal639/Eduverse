import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
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
        navigate('/');
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { label: 'Username', type: 'text', value: username, setter: setUsername, placeholder: 'Enter username', required: true },
    { label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'Enter email', required: true },
    { label: 'Password', type: 'password', value: password, setter: setPassword, placeholder: 'Enter password', required: true },
  ];

  const selectFields = [
    { label: 'Course', value: course, setter: setCourse, options: [
      { value: '', label: 'Select Course' },
      { value: 'btech', label: 'B.Tech' },
      { value: 'mca', label: 'MCA' },
      { value: 'bca', label: 'BCA' },
      { value: 'mba', label: 'MBA' },
    ]},
    { label: 'City', value: city, setter: setCity, options: [
      { value: '', label: 'Select City' },
      { value: 'bareilly', label: 'Bareilly' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'lucknow', label: 'Lucknow' },
      { value: 'mumbai', label: 'Mumbai' },
    ]},
    { label: 'College', value: college, setter: setCollege, options: [
      { value: '', label: 'Select College' },
      { value: 'itm', label: 'ITM College' },
      { value: 'mit', label: 'MIT' },
      { value: 'amity', label: 'Amity University' },
      { value: 'du', label: 'Delhi University' },
    ]},
    { label: 'Role', value: role, setter: setRole, options: [
      { value: 'user', label: 'Student' },
      { value: 'admin', label: 'Admin' },
    ]},
  ];

  return (
    <div className="main-signup-form">
      <div className="signup-bg-shapes">
        <div className="signup-shape shape-a"></div>
        <div className="signup-shape shape-b"></div>
        <div className="signup-shape shape-c"></div>
      </div>
      <div className="signup-form-wrapper">
        <div className="signup-form-card">
          <div className="signup-header">
            <div className="signup-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2>Create Account</h2>
Join EduVerse and start your learning journey
          </div>

          <form className="signup-form" onSubmit={submithandler}>
            {inputFields.map((field) => (
              <div className="input-group" key={field.label}>
                <label>
                  <i className={`fas fa-${field.type === 'password' ? 'lock' : field.type === 'email' ? 'envelope' : 'user'}`}></i>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {selectFields.map((field) => (
              <div className="input-group" key={field.label}>
                <label>
                  <i className={`fas fa-${field.label === 'Role' ? 'shield-alt' : field.label === 'Course' ? 'graduation-cap' : field.label === 'City' ? 'map-marker-alt' : 'university'}`}></i>
                  {field.label}
                </label>
                <select value={field.value} onChange={(e) => field.setter(e.target.value)}>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            ))}

            <button type="submit" className="btn-signup-submit" disabled={isLoading}>
              {isLoading ? (
                <><div className="btn-spinner"></div> Creating Account...</>
              ) : (
                <><i className="fas fa-user-plus"></i> Sign Up</>
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="btn-login-link">
                <i className="fas fa-sign-in-alt"></i> Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupform;
