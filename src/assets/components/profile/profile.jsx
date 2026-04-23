import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!token) {
    return <div>Please log in to view profile</div>;
  }

  const userData = JSON.parse(atob(token.split('.')[1]));
  const isAdmin = userData.role === 'admin';

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <h2>{userData.email}</h2>
        <p>Role: {userData.role}</p>
      </div>
      <div className="profile-actions">
        {!isAdmin && (
          <button onClick={() => navigate('/enrolled')} className="btn enrolled-btn">Enrolled Courses</button>
        )}

        {isAdmin && (
          <button onClick={() => navigate('/admin')} className="btn admin-btn">Admin Dashboard</button>
        )}

        <button onClick={logout} className="btn logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;

