import React, { useEffect, useState } from 'react';
import Container from '../components/container/container.jsx';
import './enrolled-course.css';

const EnrolledCourse = () => {
  const token = localStorage.getItem('token');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(token ? null : 'Please log in to view your enrolled courses.');

  useEffect(() => {
    if (!token) return;

    fetch('/api/courses/my-courses', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }
        return data;
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          throw new Error('Unexpected response format from server');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load enrolled courses. Please try again later.');
        setCourses([]);
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="enrolled-page" id="enrolled">
      <div className="main-container">
        <Container title="MY ENROLLED COURSES">
          {loading && (
            <div className="enrolled-state-message loading">
              <div className="spinner"></div>
              <p>Loading enrolled courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="enrolled-state-message error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="enrolled-state-message empty">
              <p>You haven't enrolled in any courses yet.</p>
            </div>
          )}

          {!loading && !error && courses.map(course => (
            <div className="enrolled-course-card" key={course._id}>
              <h3>{course.title}</h3>
              <p className="course-desc">{course.description}</p>
              <div className="videos-section">
                <h4>Videos</h4>
                <ul>
                  {course.videos && course.videos.map((v, i) => (
                    <li key={i}>
                      <a href={v.url} target="_blank" rel="noopener noreferrer">{v.title}</a>
                      <span>{v.duration}</span>
                    </li>
                  ))}
                  {(!course.videos || course.videos.length === 0) && (
                    <li>No videos available</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default EnrolledCourse;

