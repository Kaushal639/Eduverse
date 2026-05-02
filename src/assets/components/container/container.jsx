import React from 'react';
import './container.css';

const Container = (props) => {
    return (
        <div className="main-container">
            <div className="container">
                <div className="container-card">
                    <div className="title-section">
                        <span className="title-tag">Our Community</span>
                        <h1>{props.title}</h1>
                        <div className="title-line"></div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Container;

