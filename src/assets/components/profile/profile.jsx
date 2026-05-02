import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [enrolledCount, setEnrolledCount] = useState(0);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (!token) return;
    
    // Fetch enrolled courses
    fetch('/api/courses/my-courses', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEnrolledCount(data.length);
        }
      })
      .catch(() => {});
  }, [token]);

  if (!token) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-empty-state">
            <i className="fas fa-user-lock"></i>
            <h2>Please Log In</h2>
            <p>You need to be logged in to view your profile</p>
            <Link to="/login">
              <button className="btn-profile-primary">
                <i className="fas fa-sign-in-alt"></i> Go to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userData = JSON.parse(atob(token.split('.')[1]));
  const isAdmin = userData.role === 'admin';

  const stats = [
    { label: 'Role', value: isAdmin ? 'Administrator' : 'Student', icon: 'fa-shield-alt', color: isAdmin ? 'admin' : 'student' },
    { label: 'Enrolled', value: `${enrolledCount} Courses`, icon: 'fa-book-open', color: 'enrolled' },
    { label: 'Status', value: 'Active', icon: 'fa-check-circle', color: 'active' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-bg-shapes">
        <div className="profile-shape shape-1"></div>
        <div className="profile-shape shape-2"></div>
      </div>

      <div className="profile-wrapper">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-title">
              <h2>{userData.username || userData.email.split('@')[0]}</h2>
              <span className="profile-email">{userData.email}</span>
              <span className={`profile-badge ${isAdmin ? 'admin' : 'student'}`}>
                {isAdmin ? 'Admin' : 'Student'}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            {stats.map((stat, index) => (
              <div className={`profile-stat-card ${stat.color}`} key={index}>
                <div className="stat-icon">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="profile-actions">
            {!isAdmin && (
              <button onClick={() => navigate('/enrolled')} className="btn-profile-primary">
                <i className="fas fa-book-open"></i> My Courses
              </button>
            )}

            {isAdmin && (
              <button onClick={() => navigate('/admin')} className="btn-profile-admin">
                <i className="fas fa-cog"></i> Admin Dashboard
              </button>
            )}

            <button onClick={logout} className="btn-profile-logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

