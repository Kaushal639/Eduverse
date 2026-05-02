import React from 'react';
import './course-card.css';

const CourseCard = ({ isAdmin = false, className = "", ...props }) => {
    const Enrolled = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first');
            return;
        }
        try {
            const res = await fetch(`/api/courses/enroll/${props.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                alert('Enrolled successfully!');
            } else {
                alert(data.message);
            }
        } catch {
            alert('Error enrolling');
        }
    };

    return (
<div className={`main-course-card scroll-animate ${className}`}>
            <div className="course-card">
                <div className="course-image">
                    <img src={props.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60'} alt={props.title} />
                    <div className="course-image-overlay"></div>
                </div>
                <div className="course-details">
                    <div className="course-header">
                        <h1>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                    <div className="price-discount-section">
                        <div className="price-section">
                            <span className="current-price">₹{props.offerprice}</span>
                            <span className="original-price">₹{props.price}</span>
                        </div>
                        <div className="discount-badge">
                            <span>{props.discount}</span>
                            <small>OFF</small>
                        </div>
                    </div>
                </div>
                <div className="buy-now">
                    {isAdmin ? (
                        <button className="manage-btn" disabled>
                            <i className="fas fa-cog"></i>
                            Manage
                        </button>
                    ) : (
                        <button onClick={Enrolled} className="enroll-btn">
                            <i className="fas fa-rocket"></i>
                            Enroll Now
                        </button>
                    )}
                </div>
            </div>
            <div className="card-border-glow"></div>
        </div>
    );

};

export default CourseCard;

