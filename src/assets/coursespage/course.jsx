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

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [courses]);

    return (
        <div className="coursespage" id="courses">
            <div className="courses-hero">
                <div className="courses-hero-content">
                    <span className="courses-tag">Expand Your Knowledge</span>
                    <h1 className="courses-title">Our <span className="gradient-text">Courses</span></h1>
                    <p className="courses-subtitle">
                        Discover expertly crafted courses designed to take your skills to the next level
                    </p>
                </div>
            </div>
            <div className="container-section">
                <Container title="ALL COURSES">
                    {loading && (
                        <div className="courses-state-message loading">
                            <div className="spinner"></div>
                            <p>Loading courses...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="courses-state-message error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && courses.length === 0 && (
                        <div className="courses-state-message empty">
                            <i className="fas fa-inbox"></i>
                            <p>No courses available yet. Check back soon!</p>
                        </div>
                    )}

                    {!loading && !error && courses.map((course) => (
                        <CourseCard
                            key={course._id}
                            id={course._id}
                            title={course.title}
                            description={course.description}
                            offerprice={course.offerPrice || course.price}
                            price={course.price}
                            discount={course.discount || '0%'}
                            image={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'}
                        />
                    ))}
                </Container>
            </div>
        </div>
    );
}

export default Coursespage;

