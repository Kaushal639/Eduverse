import React from 'react';
import './course-card.css';

const CourseCard = (props) => {
const Enrolled = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    return;
  }
  try {
    const res = await fetch(`http://localhost:3000/api/courses/enroll/${props.id}`, {
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
  } catch (err) {
    alert('Error enrolling');
  }
};
    return (<>
        <div className="main-course-card">
            <div className="course-card">
                <div className="course-image">
                    <img src={props.image} alt="tuitor-img" />
                </div>
                <div className="course-details">
                    <div id="h1">
                    <h1>{props.title}</h1><br/>
                    <p>{props.description}</p> <br/>
                  
                    </div>
                    <div className="price-discount-section">
                    <div className="price-section">
                      <h2>Price: {props.offerprice}<h5>{props.price}</h5></h2>
                      </div>
                <div id="h3">
                    <h3>{props.discount}<span>off</span></h3>
                </div>
                   </div>

                </div>
                <div className="buy-now">
                    <button onClick={Enrolled}>Enroll Now</button>
                </div>
            </div>
            </div>
</>
    )
}
export default CourseCard;