import React from 'react';
import './card.css';

function Card(props) {
    return (
        <div className="main-card scroll-animate" style={{ animationDelay: `${(props.delay || 0) * 0.1}s` }}>
            <div className="card-glow"></div>
            <div className="card-image">
                <img src={props.image} alt={props.name} />
            </div>
            <div className="card-content">
                <h3 className="card-name">{props.name}</h3>
                <span className="card-dept">{props.department}</span>
                <div className="card-course">
                    <i className="fas fa-book-open"></i>
                    <span>{props.course}</span>
                </div>
            </div>
            <div className="card-shine"></div>
        </div>
    );
}

export default Card;

