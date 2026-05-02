import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

function About() {
    const features = [
        {
            icon: 'fa-solid fa-chalkboard-user',
            title: 'Expert-Led Courses',
            desc: 'Learn from professionals with real industry experience and proven track records.'
        },
        {
            icon: 'fa-solid fa-rocket',
            title: 'Career-Focused Learning',
            desc: 'Gain practical skills that translate directly to the workplace and boost your career.'
        },
        {
            icon: 'fa-solid fa-globe',
            title: 'Learn Anytime, Anywhere',
            desc: 'Access courses online and learn at your own pace from any device, anywhere in the world.'
        },
        {
            icon: 'fa-solid fa-users',
            title: 'Community Support',
            desc: 'Join a thriving community of learners, mentors, and industry experts.'
        },
        {
            icon: 'fa-solid fa-headset',
            title: '24/7 Support',
            desc: 'Get help whenever you need it with our dedicated support team and resources.'
        }
    ];

    const stats = [
        { number: '10K+', label: 'Students Enrolled' },
        { number: '200+', label: 'Expert Courses' },
        { number: '50+', label: 'Expert Instructors' },
        { number: '95%', label: 'Success Rate' }
    ];

    return (
        <div className="about-page">
            <div className="about-bg-shapes">
                <div className="about-shape shape-1"></div>
                <div className="about-shape shape-2"></div>
            </div>

            <div className="about-wrapper">
                {/* Hero Section */}
                <section className="about-hero">
                    <div className="about-badge">
                        <i className="fas fa-sparkles"></i>
About EduVerse
                    </div>
                    <h1>Empowering Learners <span className="gradient-text">Worldwide</span></h1>
                    <p>
                        We are an innovative EdTech company on a mission to make high-quality
                        education accessible, practical, and career-focused for everyone.
                    </p>
                </section>

                {/* Mission & Stats */}
                <section className="about-mission">
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>
                            From beginners to professionals, our courses are created by industry
                            experts and structured to be engaging, flexible, and easy to follow.
                        </p>
                        <p>
                            Learn at your own pace with hands-on projects, interactive lessons,
                            and continuous support from our dedicated team.
                        </p>
                    </div>
                    <div className="mission-stats">
                        {stats.map((stat, index) => (
                            <div className="mission-stat-card" key={index}>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="about-features">
                    <div className="features-header">
<span className="gradient-text">EduVerse</span>
                        <p>Discover the features that make us stand out from the rest</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div className="feature-about-card" key={index}>
                                <div className="feature-about-icon">
                                    <i className={feature.icon}></i>
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="about-cta">
                    <h2>Ready to Start Learning?</h2>
their careers with EduVerse
                    <Link to="/courses">
                        <button className="btn-about-cta">
                            Explore Courses <i className="fas fa-arrow-right"></i>
                        </button>
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default About;

