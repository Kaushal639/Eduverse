import React, { useEffect, useState } from 'react';
import Container from '../components/container/container.jsx';
import './enrolled-course.css';

const EnrolledCourse = () => {
  const token = localStorage.getItem('token');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(token ? null : 'Please log in to view your enrolled courses.');

  const fetchEnrolledCourses = () => {
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
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, [token]);

  return (
    <div className="enrolled-page" id="enrolled">
      <div className="enrolled-bg-shapes">
        <div className="enrolled-shape shape-1"></div>
        <div className="enrolled-shape shape-2"></div>
      </div>

      <div className="container-section">
        <Container title="MY ENROLLED COURSES">
          {loading && (
            <div className="enrolled-state-message loading">
              <div className="spinner"></div>
              <p>Loading enrolled courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="enrolled-state-message error">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="enrolled-state-message empty">
              <i className="fas fa-inbox"></i>
              <p>You haven't enrolled in any courses yet.</p>
            </div>
          )}

          {!loading && !error && courses.map(course => (
            <div className="enrolled-course-card" key={course._id}>
              <div className="course-card-header">
                <div className="course-card-image">
                  <img 
                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'} 
                    alt={course.title} 
                  />
                </div>
                <div className="course-card-info">
                  <h3>{course.title}</h3>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min(((course.videos?.length || 0) * 20), 100)}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {course.videos?.length || 0} videos available
                    </span>
                  </div>

                </div>
              </div>

              <div className="videos-section">
                <div className="videos-header">
                  <i className="fas fa-play-circle"></i>
                  <h4>Videos ({course.videos?.length || 0})</h4>
                </div>
                <div className="videos-list">
                  {course.videos && course.videos.map((v, i) => (
                    <div key={i} className="video-item">
                      <div className="video-info">
                        <span className="video-number">{i + 1}</span>
                        <div className="video-details">
                          <p className="video-title">{v.title}</p>
                          {v.duration && <span className="video-duration"><i className="fas fa-clock"></i> {v.duration}</span>}
                        </div>
                      </div>
                      <div className="video-player-wrapper">
                        <video
                          controls
                          className="course-video"
                          src={v.url}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  ))}
                  {(!course.videos || course.videos.length === 0) && (
                    <div className="no-videos">
                      <i className="fas fa-film"></i>
                      <p>No videos available for this course yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default EnrolledCourse;

