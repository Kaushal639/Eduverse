import React from 'react';
import CourseCard from '../components/course-card/course-card.jsx';
import Container from '../components/container/container.jsx';
import { Link } from 'react-router-dom';

function Coursespage() {
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  return (
    <div className="coursespage" id="courses">
      <div className="container-section">
        <Container title="OUR COURSES">
          {courses.map(course => (
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
