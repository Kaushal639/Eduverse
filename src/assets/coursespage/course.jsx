import React, { useState, useEffect } from 'react';
import CourseCard from '../components/course-card/course-card.jsx';
import Container from '../components/container/container.jsx';
import './course.css';

function Coursespage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/courses')
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }
        console.log('Courses data:', data);
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
        setError(err.message || 'Failed to load courses. Please try again later.');
        setCourses([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="coursespage" id="courses">
      <div className="container-section">
        <Container title="OUR COURSES">
          {loading && (
            <div className="courses-state-message loading">
              <div className="spinner"></div>
              <p>Loading courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="courses-state-message error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="courses-state-message empty">
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}

          {!loading && !error && courses.map(course => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              description={course.description}
              offerprice={course.offerPrice || course.price}
              price={course.price}
              discount={course.discount || '0%'}
              image={course.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60'}
            />
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Coursespage;
