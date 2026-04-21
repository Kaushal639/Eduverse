import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EnrolledCourse = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:3000/api/courses/my-courses', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.log(err));
  }, [token]);

  return (
    <div>
      <h1>My Enrolled Courses</h1>
      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <h4>Videos:</h4>
          <ul>
            {course.videos.map((v, i) => (
              <li key={i}>
                <a href={v.url} target="_blank">{v.title}</a> - {v.duration}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourse;
